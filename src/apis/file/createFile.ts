import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common, file } from '@/models';
import { axiosInstance } from '@/utils';

export const createFile = async (payload: file.CreatePayload) => {
  const url = '/api/files';
  return await axiosInstance.post(url, payload);
};

export const useCreateFile = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: file.CreatePayload) => createFile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.File] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
