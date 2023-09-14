import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { file } from '@/models';
import { axiosInstance } from '@/utils';

export type GetFileByIdResponse = {
  data: file.File;
  metadata?: any;
};

export const getFileById = async (id: number) => {
  const url = `/api/files/${id}`;
  const response: GetFileByIdResponse = await axiosInstance.get(url);

  return response.data;
};

export const useGetFileById = (id: number) => {
  return useQuery([api.FILE, id], () => getFileById(id));
};
