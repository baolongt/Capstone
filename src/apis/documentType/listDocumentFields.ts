import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

export type ListDocumentFieldsResponse = { id: number; field: string }[];

export const ListDocumentFields =
  async (): Promise<ListDocumentFieldsResponse> => {
    const response: ListDocumentFieldsResponse = await axiosInstance.get(
      `/api/documenttype/list-document-fields`
    );
    return response;
  };

export const useListDocumentFields = () => {
  return useQuery({
    queryKey: [api.DOCUMENT_FIELD],
    queryFn: () => ListDocumentFields(),
    keepPreviousData: true
  });
};
