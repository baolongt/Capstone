import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

const updateListShared = async (
  id: number,
  payload: {
    userids: number[];
  }
) => {
  return await axiosInstance.post(
    `/api/OutgoingDocument/shareDocToUser/${id}`,
    {
      usersId: payload.userids
    }
  );
};

export const useUpdateListShared = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [api.SHARE_LIST, id],
    mutationFn: (payload: { userids: number[] }) =>
      updateListShared(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries([api.SHARE_LIST, id]);
    }
  });
};
