import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

type sharedDepartment = {
  departmentId: number;
  departmentName: string;
  users: {
    userId: number;
    userName: string;
    userEmail: string;
  }[];
};
type ListDocumentsResponse = {
  listShared: sharedDepartment[];
  listUnshared: sharedDepartment[];
};

const listShared = async (id: number) => {
  const response: ListDocumentsResponse = await axiosInstance.get(
    `/api/IncomingDocument/getSharedUserDepartment/${id}`
  );

  return response;
};

export const useListSharedIncoming = (id: number) => {
  return useQuery({
    queryKey: [api.SHARE_LIST_IMCOMING, id],
    queryFn: () => listShared(id),
    keepPreviousData: true
  });
};
