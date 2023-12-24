import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

export const createDocType = async (data: {
  name: string;
  description: string;
  field: number;
}) => {
  return await axiosInstance.post(`/api/documenttype/create`, data);
};

export const useCreateDocType = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; description: string; field: number }) =>
      createDocType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.DOCUMENT_TYPE] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
