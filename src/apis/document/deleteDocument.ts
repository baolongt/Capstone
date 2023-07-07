import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { common } from '../../models';
import { api } from '../../constants';

export const deleteDocument = async (id: number) => {
  const url = `/api/documents`;
  return await axiosInstance.delete(url, {
    params: { id: id }
  });
};

export const useDeleteDocument = ({ onSuccess, onError }: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.DOCUMENT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
