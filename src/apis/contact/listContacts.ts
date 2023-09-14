import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { contact } from '@/models';
import { BaseTableQueryParams, Metadata } from '@/types';
import { axiosInstance } from '@/utils';

export type ListContactResponse = {
  data: contact.Contact[];
  metadata: Metadata;
};

export const listContacts = async ({
  queryParams
}: {
  queryParams: BaseTableQueryParams;
}): Promise<ListContactResponse> => {
  const { page, size, search } = queryParams;

  const params = {
    PageNumber: page,
    PageSize: size,
    ...(search && search != '' ? { SearchString: search } : {})
  };

  const response: ListContactResponse = await axiosInstance.get(
    `/api/contact`,
    {
      params
    }
  );

  return response;
};

type UseListContactsParams = {
  queryParams: BaseTableQueryParams;
};

export const useListContacts = ({ queryParams }: UseListContactsParams) => {
  return useQuery({
    queryKey: [api.CONTACT, queryParams],
    queryFn: () => listContacts({ queryParams }),
    keepPreviousData: true
  });
};
