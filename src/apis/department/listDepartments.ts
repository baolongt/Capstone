import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { department } from '@/models';
import { BaseTableQueryParams, Metadata } from '@/types';
import { axiosInstance } from '@/utils';

export type ListDepartmentResponse = {
  data: department.Department[];
  metadata: Metadata;
};

export const listDepartments = async ({
  queryParams
}: {
  queryParams: BaseTableQueryParams;
}): Promise<ListDepartmentResponse> => {
  const { page, size, search } = queryParams;

  const params = {
    PageNumber: page,
    PageSize: size,
    ...(search && search != '' ? { SearchString: search } : {})
  };

  const response: ListDepartmentResponse = await axiosInstance.get(
    `/api/departments`,
    {
      params
    }
  );

  return response;
};

type UseListDepartmentsParams = {
  queryParams: BaseTableQueryParams;
};

export const useListDepartments = ({
  queryParams
}: UseListDepartmentsParams) => {
  return useQuery({
    queryKey: [api.DEPARTMENT],
    queryFn: () => listDepartments({ queryParams }),
    keepPreviousData: true
  });
};
