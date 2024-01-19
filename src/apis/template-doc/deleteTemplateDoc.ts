import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

export const deleteTemplateDoc = async (id: number) => {
  return await axiosInstance.delete(`/api/Template?id=${id}`);
};

export const useDeleteTemplateDoc = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: number) => {
      return deleteTemplateDoc(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.TEMPLATE] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
