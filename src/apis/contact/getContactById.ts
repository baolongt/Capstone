import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

export const getContactById = async (id: number) => {
  const url = `/api/contact/${id}`;
  return await axiosInstance.get(url);
};

export const useGetContactById = (id: number) => {
  return useQuery([api.DEPARTMENT, id], () => getContactById(id));
};
