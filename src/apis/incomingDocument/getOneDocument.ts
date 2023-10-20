import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { Attachment, incomingDocument } from '@/models';
import { Metadata } from '@/types';
import { axiosInstance } from '@/utils';

export type GetOneDocumentResponse = {
  data: incomingDocument.IncomingDocument;
  metadata: Metadata;
};

export const getOne = async (
  id: number
): Promise<incomingDocument.IncomingDocument> => {
  const res: GetOneDocumentResponse = await axiosInstance.get(
    `/api/IncomingDocument/${id}`
  );

  return {
    ...res.data,
    attachments: res.data.attachments.map(
      (attachment) => new Attachment(attachment as Attachment)
    )
  };
};

export const useGetOneDocument = (id: number) => {
  return useQuery<incomingDocument.IncomingDocument, Error>(
    [api.INCOMING_DOCUMENT, id],
    () => getOne(id)
  );
};
