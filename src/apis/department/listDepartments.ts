import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { api } from '../../constants';

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
