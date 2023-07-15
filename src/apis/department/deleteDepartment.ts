import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

export const deleteDepartment = async ({ id }: { id: number }) => {
  const url = `/api/departments`;
  return await axiosInstance.delete(url, {
    params: { id: id }
  });
};

export const useDeleteDepartment = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: number }) => deleteDepartment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.DEPARTMENT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
