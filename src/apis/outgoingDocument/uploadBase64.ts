import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

interface SignedDocumentPayload {
  payload: string;
  fileId: string;
}

const uploadSignedDocument = async (payload: SignedDocumentPayload) => {
  try {
    const response = await axiosInstance.post(
      '/api/upload/signed-document',
      payload
    );
    console.log('Signed document uploaded:', response.data);
  } catch (error) {
    console.error('Failed to upload signed document:', error);
  }
};

export const useUploadSignedDocument = ({
  onSuccess,
  onError,
  fileId
}: common.useMutationParams & {
  fileId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SignedDocumentPayload) => {
      return uploadSignedDocument(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.OUTGOING_DOCUMENT, fileId]
      });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
