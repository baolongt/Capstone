import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

export const deleteFile = async (id: number) => {
  const url = `/api/files`;
  return await axiosInstance.delete(url, {
    params: { fileId: id }
  });
};

export const useDeleteFile = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteFile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.FILE] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
