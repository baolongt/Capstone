import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

const deleteDocType = async (id: number) => {
  const res = await axiosInstance.delete(`/api/documenttype/${id}`);

  return res;
};

export const useDeleteDocType = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDocType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.DOCUMENT_TYPE] });
      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      onError?.(error?.response?.data);
    }
  });
};
