import { useMutation, useQueryClient } from '@tanstack/react-query';
import { common, document, user } from '../../models';
import { axiosInstance } from '../../utils';
import { api } from '../../constants';

export const createDocument = async (payload: document.CreatePayload) => {
  const url = '/api/documents';
  return await axiosInstance.post(url, payload);
};


export const useCreateDocument = ({ onSuccess, onError }: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: document.CreatePayload) => createDocument(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.DOCUMENT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
