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

export const editPublishInfo = async (payload: editPublishInfoPayload) => {
  const url = 'api/OutgoingDocument/edit-publish-info';
  const response = await axiosInstance.post(url, payload);
  return response.data;
};

export const useEditPublishInfo = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editPublishInfo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.OUTGOING_DOCUMENT] });
      onSuccess && onSuccess(data);
    },
    onError: () => {
      onError && onError();
    }
  });
};
