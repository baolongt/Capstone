import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { outgoingDocument } from '@/models';
import { Metadata } from '@/types';
import { axiosInstance } from '@/utils';

export type GetOneDocumentResponse = {
  data: outgoingDocument.OutgoingDocument;
  metadata: Metadata;
};

export const getOne = async (
  id: number
): Promise<outgoingDocument.OutgoingDocument> => {
  const res: GetOneDocumentResponse = await axiosInstance.get(
    `/api/OutgoingDocument/${id}`
  );

  return res.data;
};

export const useGetOneDocument = (id: number) => {
  return useQuery<outgoingDocument.OutgoingDocument, Error>(
    [api.OUTGOING_DOCUMENT, id],
    () => getOne(id)
  );
};
