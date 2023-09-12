import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

export const logout = async () => {
  const url = 'api/Authentication/logout';
  const response: string = await axiosInstance.post(API_URL + url);

  if (response) {
    return response;
  }
};

export const useLogout = ({ onSuccess, onError }: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['logout'] });
      onSuccess?.(data);
    },
    onError: () => {
      onError?.();
    }
  });
};
