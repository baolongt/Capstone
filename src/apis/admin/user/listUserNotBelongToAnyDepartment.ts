import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { user } from '@/models';
import { axiosInstance } from '@/utils';

export type ListUserResponse = user.User[];

const fetchUsers = async (departmentId?: string): Promise<ListUserResponse> => {
  let url = '/api/users/users-available';
  if (departmentId) {
    url += `?departmentId=${departmentId}`;
  }
  const response: ListUserResponse = await axiosInstance.get(url);

  return response;
};

export const useListUserNotBelongToAnyDepartment = (departmentId?: string) => {
  return useQuery<ListUserResponse, Error>({
    queryKey: [api.USERS_NOT_HAVE_DEPARTMENT],
    queryFn: () => fetchUsers(departmentId),
    keepPreviousData: true
  });
};
