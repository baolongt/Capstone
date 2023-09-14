import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common, contact } from '@/models';
import { axiosInstance } from '@/utils';

export const createContact = async (payload: contact.CreatePayload) => {
  const url = 'api/contact';
  return await axiosInstance.post(url, payload);
};

export const useCreateContact = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: contact.CreatePayload) => createContact(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.CONTACT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
