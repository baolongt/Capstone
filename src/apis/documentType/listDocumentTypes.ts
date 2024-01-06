import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { documentType } from '@/models';
import { BaseTableQueryParams, Metadata } from '@/types';
import { axiosInstance } from '@/utils';

export type ListDocumentTypesResponse = {
  data: documentType.DocumentType[];
  metadata: Metadata;
};

export const ListDocumentTypes = async ({
  queryParams,
  field
}: {
  queryParams: BaseTableQueryParams;
  field?: number;
}): Promise<ListDocumentTypesResponse> => {
  const { page, size } = queryParams;

  const params = {
    PageNumber: page,
    PageSize: size,
    ...(field ? { DocumentField: field } : {}),
    ...(queryParams.search ? { SearchString: queryParams.search } : {})
  };

  const response: ListDocumentTypesResponse = await axiosInstance.get(
    `/api/documenttype/list-document-types`,
    {
      params
    }
  );
  return response;
};

type UseListDocumentTypesParams = {
  queryParams: BaseTableQueryParams;
  field?: number;
};

export const useListDocumentTypes = ({
  queryParams,
  field
}: UseListDocumentTypesParams) => {
  return useQuery({
    queryKey: [api.DOCUMENT_TYPE, queryParams, field],
    queryFn: () => ListDocumentTypes({ queryParams, field }),
    keepPreviousData: true
  });
};
