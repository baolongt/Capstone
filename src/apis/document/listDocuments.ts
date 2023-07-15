import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

export const listDocuments = async () => {
  const url = '/api/documents';
  return await axiosInstance.get(url);
};

export const useListDocuments = () => {
  return useQuery({
    queryKey: [api.DOCUMENT],
    queryFn: listDocuments
  });
};
