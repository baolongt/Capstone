import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { Comment, DocumentType } from '@/models/comment';
import { axiosInstance } from '@/utils';

type FetchCommentsPayload = {
  docId: number;
  documentType: DocumentType;
};

type FetchCommentsResponse = {
  data: Comment[];
};

const fetchComments = async ({ docId, documentType }: FetchCommentsPayload) => {
  const url = `/api/comment/document-comments`;

  const res: FetchCommentsResponse = await axiosInstance.get(url, {
    params: {
      docId,
      documentType
    }
  });

  return res.data;
};

export const useListComments = ({
  docId,
  documentType
}: FetchCommentsPayload) => {
  return useQuery([api.COMMENT, documentType, docId], () =>
    fetchComments({ docId, documentType })
  );
};
