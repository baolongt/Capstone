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
  queryParams
}: {
  queryParams: BaseTableQueryParams;
}): Promise<ListDocumentTypesResponse> => {
  const { page, size } = queryParams;

  const params = {
    PageNumber: page,
    PageSize: size
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
};

export const useListDocumentTypes = ({
  queryParams
}: UseListDocumentTypesParams) => {
  return useQuery({
    queryKey: [api.DOCUMENT_TYPE, queryParams],
    queryFn: () => ListDocumentTypes({ queryParams }),
    keepPreviousData: true
  });
};
