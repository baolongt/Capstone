import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api, OutgoingDocumentStatus } from '@/constants';
import { common, outgoingDocument } from '@/models';
import { axiosInstance } from '@/utils';

export const forwarđocument = async (
  payload: outgoingDocument.ForwardOutgoingDocument
) => {
  const url = '/api/OutgoingDocument/change-status';

  if (payload.newStatus === OutgoingDocumentStatus.DANG_XU_LY) {
    console.error(
      'ERROR',
      {
        payload
      },
      'status === 0'
    );
    throw new Error('Vản bản không hợp lệ');
  }

  if (
    (payload.newStatus - 1 === OutgoingDocumentStatus.CHO_LANH_DAO_KY ||
      payload.newStatus - 1 === OutgoingDocumentStatus.CHO_VAN_THU_LAY_SO) &&
    payload.newHandlerId === -1
  ) {
    console.error(
      'ERROR',
      {
        payload
      },
      'status === null'
    );
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
