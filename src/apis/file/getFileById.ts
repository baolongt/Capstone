import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { file } from '@/models';
import { BaseTableQueryParams, Metadata } from '@/types';
import { axiosInstance } from '@/utils';

export type GetFileByIdResponse = {
  data: file.File;
  metadata?: Metadata;
};

export const getFileById = async ({
  id,
  docType = 'outgoing',
  queryParams
}: {
  id: number;
  docType: 'outgoing' | 'incoming' | 'internal';
  queryParams: BaseTableQueryParams;
}) => {
  const url = `/api/files/${id}`;

  const { page, size, search } = queryParams;

  const params = {
    docType: docType,
    PageNumber: page,
    PageSize: size,
    ...(search && search != '' ? { SearchString: search } : {})
  };

  const response: GetFileByIdResponse = await axiosInstance.get(url, {
    params
  });

  return response;
};

export const useGetFileById = ({
  id,
  docType,
  queryParams
}: {
  id: number;
  docType: 'outgoing' | 'incoming' | 'internal';
  queryParams: BaseTableQueryParams;
}) => {
  return useQuery([api.FILE, id, queryParams], () =>
    getFileById({ id, docType, queryParams })
  );
};
