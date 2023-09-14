import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

export const getFileById = async (id: number) => {
  const url = `/api/files/${id}`;
  return await axiosInstance.get(url);
};

export const useGetFileById = (id: number) => {
  return useQuery([api.FILE, id], () => getFileById(id));
};
