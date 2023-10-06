import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { template } from '@/models';
import { BaseTableQueryParams, Metadata } from '@/types';
import { axiosInstance } from '@/utils';

export type ListTemplateResponse = {
  data: template.Template[];
  metadata: Metadata;
};

export const listTemplate = async ({
  queryParams
}: {
  queryParams: BaseTableQueryParams;
}): Promise<ListTemplateResponse> => {
  const { page, size, search } = queryParams;

  const params = {
    PageNumber: page,
    PageSize: size,
    ...(search && search != '' ? { SearchString: search } : {})
  };

  const response: ListTemplateResponse = await axiosInstance.get(
    `/api/Template`,
    {
      params
    }
  );

  return response;
};

export const useListTemplate = ({
  queryParams
}: {
  queryParams: BaseTableQueryParams;
}) => {
  return useQuery<ListTemplateResponse, Error>({
    queryKey: [api.TEMPLATE, queryParams],
    queryFn: () => listTemplate({ queryParams }),
    keepPreviousData: true
  });
};
