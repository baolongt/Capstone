import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { incomingDocument } from '@/models';
import { BaseTableQueryParams, Metadata } from '@/types';
import { axiosInstance } from '@/utils';

export type ListDocumentsResponse = {
  data: incomingDocument.IncomingDocument[];
  metadata: Metadata;
};

const fetchIncomingDocuments = async ({
  // Update function name and parameter name
  queryParams
}: {
  queryParams: BaseTableQueryParams;
}): Promise<ListDocumentsResponse> => {
  const { page, size, search, dateRange } = queryParams;
  const { from, to } = dateRange || {};

  const params = {
    PageNumber: page,
    PageSize: size,
    ...(search && search != '' ? { SearchString: search } : {}),
    ...(from && from != '' ? { BeforeDate: from } : {}),
    ...(to && to != '' ? { AfterDate: to } : {})
  };

  const response: ListDocumentsResponse = await axiosInstance.get(
    `/api/IncomingDocument`,
    {
      params
    }
  );
  return response;
};

type UseListDocumentsParams = {
  queryParams: BaseTableQueryParams;
};

export const useListIncomingDocuments = ({
  queryParams
}: UseListDocumentsParams) => {
  return useQuery<ListDocumentsResponse, Error>({
    queryKey: [api.INCOMING_DOCUMENT, queryParams],
    queryFn: () =>
      fetchIncomingDocuments({
        queryParams
      }),
    keepPreviousData: true
  });
};
