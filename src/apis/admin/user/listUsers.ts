import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { user } from '@/models';
import { axiosInstance } from '@/utils';

export const listUsers = async () => {
  const url = '/api/users';
  const result: user.User[] = await (await axiosInstance.get(url)).data;
  const users = result.map((r: user.User) => {
    return new user.User(r);
  });
  return users;
};

export const useListUsers = () => {
  return useQuery({
    queryKey: [api.USER],
    queryFn: listUsers
  });
};
