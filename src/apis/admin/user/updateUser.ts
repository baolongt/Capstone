import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '../../../constants';
import { user } from '../../../models';
import { axiosInstance } from '../../../utils';

export const updateUser = async ({
  id,
  payload
}: {
  id: number;
  payload: user.UpdatePayload;
}) => {
  const url = `/api/users?id=${id}`;
  return await axiosInstance.put(url, payload);
};

export type useUpdateUserParams = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useUpdateUser = ({ onSuccess, onError }: useUpdateUserParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: number; payload: user.UpdatePayload }) => {
      return updateUser(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.USER] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
