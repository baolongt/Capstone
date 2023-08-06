import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

export const getDepartmentById = async (id: number) => {
  const url = `/api/departments/${id}`;
  return await axiosInstance.get(url);
};

export const useGetDepartmentById = (id: number) => {
  // path users/id
  return useQuery([api.DEPARTMENT, id], () => getDepartmentById(id));
};
