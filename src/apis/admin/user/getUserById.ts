import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

export const getUserById = async (id: number) => {
  const url = `/api/users/${id}`;
  return await axiosInstance.get(url);
};

export const useGetUserById = (id: number) => {
  // path users/id
  return useQuery([api.USER, id], () => getUserById(id));
};
