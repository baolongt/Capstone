import { useMutation } from '@tanstack/react-query';

import { common } from '@/models';
import { axiosInstance } from '@/utils';

export const changePassword = async (payload: {
  oldPassword: string;
  newPassword: string;
}) => {
  const url = '/api/Authentication/reset-password';

  return await axiosInstance.put(url, payload);
};

export const useChangePassword = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  return useMutation({
    mutationFn: (payload: { oldPassword: string; newPassword: string }) => {
      return changePassword(payload);
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
