import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

type ListDocumentsResponse = {
  departmentId: number;
  departmentName: string;
  users: {
    userId: number;
    userName: string;
    userEmail: string;
  }[];
}[];

const listUnshared = async (id: number) => {
  const response: ListDocumentsResponse = await axiosInstance.get(
    `/api/OutgoingDocument/getUnsharedUserDepartment/${id}`
  );

  return Array.isArray(response) ? response : [];
};

export const useListUnshared = (id: number) => {
  return useQuery({
    queryKey: [api.UNSHARE_LIST, id],
    queryFn: () => listUnshared(id),
    keepPreviousData: true
  });
};
