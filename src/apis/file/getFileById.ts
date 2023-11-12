import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { file } from '@/models';
import { Metadata } from '@/types';
import { axiosInstance } from '@/utils';

export type GetFileByIdResponse = {
  data: file.File;
  metadata?: Metadata;
};

export const getFileById = async ({
  id,
  docType = 'outgoing'
}: {
  id: number;
  docType: 'outgoing' | 'incoming' | 'internal';
}) => {
  const url = `/api/files/${id}?docType=${docType}`;
  const response: GetFileByIdResponse = await axiosInstance.get(url);

  return response.data;
};

export const useGetFileById = ({
  id,
  docType
}: {
  id: number;
  docType: 'outgoing' | 'incoming' | 'internal';
}) => {
  return useQuery([api.FILE, id], () => getFileById({ id, docType }));
};
