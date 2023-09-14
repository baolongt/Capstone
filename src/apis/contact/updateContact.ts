import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common, contact } from '@/models';
import { axiosInstance } from '@/utils';

export const updateContact = async ({
  id,
  payload
}: {
  id: number;
  payload: contact.CreatePayload;
}) => {
  const url = `/api/contact?id=${id}`;
  return await axiosInstance.put(url, payload);
};

export const useUpdateContact = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: number; payload: contact.CreatePayload }) => {
      return updateContact(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.CONTACT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
