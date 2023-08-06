import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common, file } from '@/models';
import { axiosInstance } from '@/utils';

export const updateFile = async ({
  id,
  payload
}: {
  id: number;
  payload: any;
}) => {
  const url = `/api/files/${id}`;
  return await axiosInstance.put(url, payload);
};

export const useUpdateFile = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: number; payload: file.UpdatePayload }) => {
      return updateFile(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.FILE] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
