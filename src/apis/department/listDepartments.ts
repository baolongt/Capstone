import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

export const listDepartments = async () => {
  const url = '/api/departments';
  return await axiosInstance.get(url);
};

export const useListDepartments = () => {
  return useQuery({
    queryKey: [api.DEPARTMENT],
    queryFn: listDepartments
  });
};
