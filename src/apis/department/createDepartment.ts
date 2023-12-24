import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common, department } from '@/models';
import { axiosInstance } from '@/utils';

export const createDepartment = async (payload: department.CreatePayload) => {
  const url = 'api/departments';
  return await axiosInstance.post(url, payload);
};

export const useCreateDepartment = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: department.CreatePayload) =>
      createDepartment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.DEPARTMENT] });
      queryClient.invalidateQueries({
        queryKey: [api.USERS_NOT_HAVE_DEPARTMENT]
      });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
