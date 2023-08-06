import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { file } from '@/models';
import { axiosInstance } from '@/utils';

export const listFiles = async () => {
  const url = '/api/files';
  const result = await (await axiosInstance.get(url)).data;
  const files = result.map((r: file.File) => {
    return new file.File(r);
  });
  return files;
};

export const useListFiles = () => {
  return useQuery({
    queryKey: [api.File],
    queryFn: listFiles
  });
};
