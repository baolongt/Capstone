import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

export type editPublishInfoPayload = {
  outgoingDocumentId: number;
  outgoingNumber: number;
  outgoingNotation: string;
  priority: number;
  issuedAmount: number;
  dueDate: string;
  contactListIds: number[];
};

export const editPublishInfo = async ({
  outgoingDocumentId,
  ...rest
}: editPublishInfoPayload) => {
  const url = `api/OutgoingDocument/update-publish-info/${outgoingDocumentId}`;
  const response = await axiosInstance.put(url, {
    ...rest,
    outgoingDocumentId: outgoingDocumentId
  });
  return response.data;
};

export const useEditPublishInfo = ({
  onSuccess,
  onError,
  id
}: common.useMutationParams & { id: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editPublishInfo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.OUTGOING_DOCUMENT, id] });
      onSuccess && onSuccess(data);
    },
    onError: () => {
      onError && onError();
    }
  });
};
