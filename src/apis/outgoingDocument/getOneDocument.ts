import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { Attachment, outgoingDocument } from '@/models';
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

  return {
    ...res.data,
    attachments: res.data.attachments.map(
      (attachment) =>
        new Attachment({
          id: attachment.fileGuid,
          ...attachment
        } as Attachment)
    )
  };
};

export const useGetOneDocument = (id: number) => {
  return useQuery<outgoingDocument.OutgoingDocument, Error>(
    [api.OUTGOING_DOCUMENT, id],
    () => getOne(id)
  );
};
