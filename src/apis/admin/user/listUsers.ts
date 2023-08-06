import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { user } from '@/models';
import { BaseTableQueryParams, Metadata } from '@/types';
import { axiosInstance } from '@/utils';

export type ListUserResponse = {
  data: user.User[];
  metadata: Metadata;
};

const fetchUsers = async ({
  queryParams
}: {
  queryParams: BaseTableQueryParams;
}): Promise<ListUserResponse> => {
  const { page, size, search } = queryParams;

  const params = {
    PageNumber: page,
    PageSize: size,
    ...(search && search != '' ? { SearchString: search } : {})
  };

  const response: ListUserResponse = await axiosInstance.get(`/api/users`, {
    params
  });

  console.log('debug response', response);

  return response;
};

type UseListUsersParams = {
  queryParams: BaseTableQueryParams;
};

export const useListUsers = ({ queryParams }: UseListUsersParams) => {
  return useQuery<ListUserResponse, Error>({
    queryKey: [api.USER, queryParams],
    queryFn: () =>
      fetchUsers({
        queryParams
      }),
    keepPreviousData: true
  });
};
