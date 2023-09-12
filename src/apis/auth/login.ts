import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import { auth, common } from '@/models';
import { axiosInstance } from '@/utils';

export const login = async (payload: auth.LoginPayload) => {
  const url = 'api/Authentication/login';
  const response: auth.Auth = await axiosInstance.post(API_URL + url, payload);

  if (response) {
    return response;
  }
};

export const useLogin = ({ onSuccess, onError }: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: auth.LoginPayload) => login(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['Login'] });
      onSuccess?.(data);
    },
    onError: () => {
      onError?.();
    }
  });
};
