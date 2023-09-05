import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common, outgoingDocument } from '@/models';
import { axiosInstance } from '@/utils';

export const forwarđocument = async (
  payload: outgoingDocument.ForwardOutgoingDocument
) => {
  const url = '/OutgoingDocument/change-status';
  return await axiosInstance.post(url, payload);
};

export const useForwardDocument = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: outgoingDocument.ForwardOutgoingDocument) =>
      forwarđocument(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.OUTGOING_DOCUMENT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
