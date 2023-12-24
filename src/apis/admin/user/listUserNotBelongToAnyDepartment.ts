import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { user } from '@/models';
import { axiosInstance } from '@/utils';

export type ListUserResponse = user.User[];

const fetchUsers = async (): Promise<ListUserResponse> => {
  const response: ListUserResponse = await axiosInstance.get(
    `/api/users/users-not-belong-to-any-department`
  );

  return response;
};

export const useListUserNotBelongToAnyDepartment = () => {
  return useQuery<ListUserResponse, Error>({
    queryKey: [api.USERS_NOT_HAVE_DEPARTMENT],
    queryFn: () => fetchUsers(),
    keepPreviousData: true
  });
};
