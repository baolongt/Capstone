import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

export type AddDocToFilePayload = {
  fileId: number;
  outGoingDocumentId: number;
};

export const addDocToFile = async (
  fileId: number,
  outGoingDocumentId: number
) => {
  const url = `/api/files/addDoc/${fileId}/${outGoingDocumentId}`;
  return await axiosInstance.post(url);
};

export const useAddDocToFile = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddDocToFilePayload) =>
      addDocToFile(payload.fileId, payload.outGoingDocumentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.FILE] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
