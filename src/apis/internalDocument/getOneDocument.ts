import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { Attachment, internalDocument } from '@/models';
import { Metadata } from '@/types';
import { axiosInstance } from '@/utils';

export type GetOneDocumentResponse = {
  data: internalDocument.InternalDocument;
  metadata: Metadata;
};

export const getOne = async (
  id: number
): Promise<internalDocument.InternalDocument> => {
  const res: GetOneDocumentResponse = await axiosInstance.get(
    `/api/InternalDocument/${id}`
  );

  return {
    ...res.data,
    attachments: res.data.attachments.map(
      (attachment) => new Attachment(attachment as Attachment)
    )
  };
};

export const useGetOneDocument = (id: number) => {
  return useQuery<internalDocument.InternalDocument, Error>(
    [api.INTERNAL_DOCUMENT, id],
    () => getOne(id)
  );
};
