import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { internalDocument } from '@/models';
import { BaseTableQueryParams, Metadata } from '@/types';
import { axiosInstance } from '@/utils';

export type ListDocumentsResponse = {
  data: internalDocument.InternalDocument[];
  metadata: Metadata;
};

const fetchInternalDocuments = async ({
  // Update function name and parameter name
  queryParams
}: {
  queryParams: BaseTableQueryParams;
}): Promise<ListDocumentsResponse> => {
  const { page, size, search, dateRange, statusFilter } = queryParams;
  const { from, to } = dateRange || {};

  const params = {
    PageNumber: page,
    PageSize: size,
    ...(search && search != '' ? { SearchString: search } : {}),
    ...(from && from != '' ? { BeforeDate: from } : {}),
    ...(to && to != '' ? { AfterDate: to } : {}),
    ...(statusFilter ? { statusFilter: statusFilter } : {})
  };

  const response: ListDocumentsResponse = await axiosInstance.get(
    `/api/InternalDocument`,
    {
      params
    }
  );
  return response;
};

type UseListDocumentsParams = {
  queryParams: BaseTableQueryParams;
};

export const useListInternalDocuments = ({
  queryParams
}: UseListDocumentsParams) => {
  return useQuery<ListDocumentsResponse, Error>({
    queryKey: [api.INTERNAL_DOCUMENT, queryParams],
    queryFn: () =>
      fetchInternalDocuments({
        queryParams
      }),
    keepPreviousData: true
  });
};
