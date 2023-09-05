import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { API_URL } from '@/constants';
import { auth, common } from '@/models';

// TODO: change to real api
export const login = async (payload: auth.LoginPayload) => {
  const url = 'api/Authentication/login';
  const response = axios.post(API_URL + url, payload).then((res) => {
    console.log('header', res.headers);
    console.table(Object.keys(res.headers));
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
