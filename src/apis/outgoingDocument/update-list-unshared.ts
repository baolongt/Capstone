import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

const updateListUnShared = async (
  id: number,
  payload: {
    userids: number[];
  }
) => {
  return await axiosInstance.post(
    `/api/OutgoingDocument/unshareDocToUser/${id}`,
    {
      usersId: payload.userids
    }
  );
};

export const useUpdateListUnShared = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [api.UNSHARE_LIST, id],
    mutationFn: (payload: { userids: number[] }) =>
      updateListUnShared(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries([api.UNSHARE_LIST, id]);
    }
  });
};
