import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common, outgoingDocument } from '@/models';
import { axiosInstance } from '@/utils';

export const forwarđocument = async (
  payload: outgoingDocument.ForwardOutgoingDocument
) => {
  const url = '/api/OutgoingDocument/change-status';

  if (payload.newStatus === 0) {
    console.error('ERROR', 'status === 0');
    throw new Error('Vản bản không hợp lệ');
  }

  if (payload.newStatus === 3 && payload.newHandlerId === -1) {
    console.error('ERROR', 'note === null');
    throw new Error('Không chọn người xử lý');
  }

  const requestPayload = {
    documentId: payload.documentId,
    newStatus: payload.newStatus,
    newNote: payload.newNote,
    ...(payload.newHandlerId === -1
      ? {}
      : { newHandlerId: payload.newHandlerId })
  };

  return await axiosInstance.post(url, requestPayload);
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
    onError: (error) => {
      onError?.(error);
    }
  });
};
