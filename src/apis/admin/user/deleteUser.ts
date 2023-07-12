import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '../../../constants';
import { axiosInstance } from '../../../utils';

export const deleteUser = async ({ id }: { id: number }) => {
  const url = `/api/users`;
  return await axiosInstance.delete(url, {
    params: { id: id }
  });
};

export type useDeleteUserParams = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useDeleteUser = ({ onSuccess, onError }: useDeleteUserParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: number }) => deleteUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.USER] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
