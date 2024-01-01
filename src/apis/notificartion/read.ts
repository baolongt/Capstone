import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

const readAllNoti = async () => {
  await axiosInstance.post('/api/notifications/readAll');
};

export const useReadAllNoti = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readAllNoti,
    onSuccess: () => {
      queryClient.invalidateQueries([api.NOTIFICATION]);
    },
    onError: () => {
      queryClient.invalidateQueries([api.NOTIFICATION]);
    }
  });
};
