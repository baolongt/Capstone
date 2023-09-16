import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

export type RemoveDocFromFilePayload = {
  fileId: number;
  outGoingDocumentId: number;
};

export const removeDocFromFile = async (
  fileId: number,
  outGoingDocumentId: number
) => {
  const url = `/api/files/removeDoc/${fileId}/${outGoingDocumentId}`;
  return await axiosInstance.post(url);
};

export const useRemoveDocFromFile = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RemoveDocFromFilePayload) =>
      removeDocFromFile(payload.fileId, payload.outGoingDocumentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.FILE] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
