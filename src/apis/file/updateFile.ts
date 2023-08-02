import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common, document } from '@/models';
import { axiosInstance } from '@/utils';

export const updateDocument = async ({
  id,
  payload
}: {
  id: number;
  payload: document.UpdatePayload;
}) => {
  const url = `/api/files?id=${id}`;
  return await axiosInstance.put(url, payload);
};

export const useUpdateDocument = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: number; payload: document.UpdatePayload }) => {
      return updateDocument(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.DOCUMENT] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
