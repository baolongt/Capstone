import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

export type addPublishInfoPayload = {
  outgoingDocumentId: number;
  outgoingNumber: number;
  outgoingNotation: string;
  priority: number;
  issuedAmount: number;
  dueDate: string;
  contactListIds: number[];
};

export const addPublishInfo = async (payload: addPublishInfoPayload) => {
  const url = 'api/OutgoingDocument/create-publish-info';
  console.log('call', url);
  const response = await axiosInstance.post(url, payload);
  return response.data;
};

export const useAddPublishInfo = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPublishInfo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.OUTGOING_DOCUMENT] });
      onSuccess && onSuccess(data);
    },
    onError: () => {
      onError && onError();
    }
  });
};
