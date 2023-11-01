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

const listShared = async (id: number) => {
  const response: ListDocumentsResponse = await axiosInstance.get(
    `/api/OutgoingDocument/getSharedUserDepartment/${id}`
  );

  return Array.isArray(response) ? response : [];
};

export const useListShared = (id: number) => {
  return useQuery({
    queryKey: [api.SHARE_LIST, id],
    queryFn: () => listShared(id),
    keepPreviousData: true
  });
};
