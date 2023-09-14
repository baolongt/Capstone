import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

export const deleteContact = async ({ id }: { id: number }) => {
  const url = `/api/contact`;
  return await axiosInstance.delete(url, {
    params: { id: id }
  });
};

export const useDeleteContact = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: number }) => deleteContact(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.CONTACT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
