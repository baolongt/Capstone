import { useQuery } from '@tanstack/react-query';

import { api } from '../../../constants';
import { axiosInstance } from '../../../utils';

export const listUsers = async () => {
  const url = '/api/users';
  return await axiosInstance.get(url);
};

export const useListUsers = () => {
  return useQuery({
    queryKey: [api.USER],
    queryFn: listUsers
  });
};
