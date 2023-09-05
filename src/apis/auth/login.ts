import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { API_URL } from '@/constants';
import { auth, common } from '@/models';

// TODO: change to real api
export const login = async (payload: auth.LoginPayload) => {
  const url = 'api/Authentication/login';
  const response: auth.Auth = await axios
    .post(API_URL + url, payload, {
      withCredentials: true
    })
    .then((res: AxiosResponse<auth.Auth>) => {
      return res.data;
    });

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
