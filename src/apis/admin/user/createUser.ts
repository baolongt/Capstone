import { useMutation } from '@tanstack/react-query';
import { api } from '../../../constants';
import { user } from '../../../models';
import { axiosInstance, queryClient } from '../../../utils';

export const createUser = async (payload: user.CreatePayload) => {
  const url = '/api/users';
  return await axiosInstance.post(url, payload);
};

export type useCreateUserParams = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useCreateUser = ({ onSuccess, onError }: useCreateUserParams) => {
  return useMutation({
    mutationFn: (payload: user.CreatePayload) => createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.USER] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
