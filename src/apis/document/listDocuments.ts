import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { api } from '../../constants';

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
