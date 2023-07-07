import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { api } from '../../constants';

export const getDepartmentById = async (id: number) => {
  const url = `/api/departments/${id}`;
  return await axiosInstance.get(url);
};

export const useGetDepartmentById = (id: number) => {
  // path users/id
  return useQuery([api.DOCUMENT, id], () => getDepartmentById(id));
};
