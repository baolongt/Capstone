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
  const { page, size } = queryParams;

  const params = {
    PageNumber: page,
    PageSize: size
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
    queryKey: [api.TEMPLATE],
    queryFn: () => listTemplate({ queryParams }),
    keepPreviousData: true
  });
};
