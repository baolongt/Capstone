import { useQuery } from '@tanstack/react-query';
import { api } from '../../../constants';
import { axiosInstance } from '../../../utils';

export const getUserById = async (id: string) => {
  const url = `/api/users/${id}`;
  return await axiosInstance.get(url);
};

export const useGetUserById = (id: string) => {
  // path users/id
  return useQuery([api.USER, id], () => getUserById(id));
};
