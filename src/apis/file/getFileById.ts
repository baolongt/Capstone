import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

export const getFileById = async (id: string) => {
  const url = `/api/files/${id}`;
  return await axiosInstance.get(url);
};

export const useGetFileById = (id: string) => {
  return useQuery([api.FILE, id], () => getFileById(id));
};
