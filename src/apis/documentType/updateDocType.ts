import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

const updateDocType = async ({
  id,
  payload
}: {
  id: number;
  payload: {
    description: string;
    field: number;
  };
}) => {
  return await axiosInstance.put(`/api/documenttype/${id}`, payload);
};

export const useUpdateDocType = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: {
      id: number;
      payload: {
        description: string;
        field: number;
      };
    }) => updateDocType(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.DOCUMENT_TYPE] });
      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      onError?.(error?.response?.data);
    }
  });
};
