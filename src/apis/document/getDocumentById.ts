import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { api } from '../../constants';

export const getDocumentById = async (id: string) => {
  const url = `/api/documents/${id}`;
  return await axiosInstance.get(url);
};

export const useGetDocumentById = (id: string) => {
  // path users/id
  return useQuery([api.DOCUMENT, id], () => getDocumentById(id));
};
