import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { user } from '@/models';
import { axiosInstance } from '@/utils';

export const getUserById = async (id?: number | null) => {
  if (!id) return;
  const url = `/api/users/${id}`;
  const result: {
    data: user.User;
  } = await axiosInstance.get(url);

  return result.data;
};

export const useGetUserById = (id?: number | null) => {
  // path users/id
  return useQuery([api.USER, id], () => getUserById(id));
};
