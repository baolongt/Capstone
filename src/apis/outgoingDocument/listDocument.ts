import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { outgoingDocument } from '@/models';
import { BaseTableQueryParams, Metadata } from '@/types';
import { axiosInstance } from '@/utils';

export type ListDocumentsResponse = {
  // Update type name
  data: outgoingDocument.OutgoingDocument[]; // Update type name
  metadata: Metadata;
};

const fetchDocuments = async ({
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
    ...(to && to != '' ? { AfterDate: to } : {}),
    statusFilter: -1
  };

  const response: ListDocumentsResponse = await axiosInstance.get(
    `/api/OutgoingDocument`,
    {
      // Update endpoint
      params
    }
  );

  return response;
};

type UseListDocumentsParams = {
  // Update type name
  queryParams: BaseTableQueryParams;
};

export const useListDocuments = ({ queryParams }: UseListDocumentsParams) => {
  // Update function name
  return useQuery<ListDocumentsResponse, Error>({
    queryKey: [api.OUTGOING_DOCUMENT, queryParams], // Update API endpoint
    queryFn: () =>
      fetchDocuments({
        // Update function name
        queryParams
      }),
    keepPreviousData: true
  });
};
