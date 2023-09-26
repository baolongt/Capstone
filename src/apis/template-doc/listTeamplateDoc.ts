import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { template } from '@/models';
import { BaseTableQueryParams, Metadata } from '@/types';

export type ListTemplateResponse = {
  data: template.Template[];
  metadata: Metadata;
};

export const listTemplate = async ({
  queryParams
}: {
  queryParams: BaseTableQueryParams;
}): Promise<ListTemplateResponse> => {
  console.log(queryParams);
  // Replace this with your mock data
  const mockData: template.Template[] = [
    {
      id: 1,
      name: 'Template 1',
      url: 'https://example.com/template1',
      createdAt: '2021-10-01T00:00:00.000Z'
    },
    {
      id: 2,
      name: 'Template 2',
      url: 'https://example.com/template2',
      createdAt: '2021-10-02T00:00:00.000Z'
    },
    {
      id: 3,
      name: 'Template 3',
      url: 'https://example.com/template3',
      createdAt: '2021-10-03T00:00:00.000Z'
    }
  ];
  const mockMetadata: Metadata = {
    pageCount: 1,
    totalItemCount: 3,
    pageNumber: 1,
    pageSize: 10,
    hasPreviousPage: false,
    hasNextPage: false,
    isFirstPage: true,
    isLastPage: true,
    firstItemOnPage: 1,
    lastItemOnPage: 3
  };

  // Simulate an API call by returning a Promise that resolves with the mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockData, metadata: mockMetadata });
    }, 1000);
  });
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
