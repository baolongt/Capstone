import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { user } from '@/models';
import { axiosInstance } from '@/utils';

export type ListUserResponse = user.User[];

const fetchUsers = async (): Promise<ListUserResponse> => {
  const response: ListUserResponse = await axiosInstance.get(
    `/api/users/get-handler`
  );

  return response;
};

export const useListHandlers = () => {
  return useQuery<ListUserResponse, Error>({
    queryKey: [api.WORKFLOW_HANDLER],
    queryFn: () => fetchUsers(),
    keepPreviousData: true
  });
};
