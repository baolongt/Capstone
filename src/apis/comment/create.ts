import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { DocumentType } from '@/models/comment';
import { axiosInstance } from '@/utils';

type createPayload = {
  content: string;
  docId: number;
  documentType: DocumentType;
};

const create = async ({ content, docId, documentType }: createPayload) => {
  const url = `/api/comment?documentType=${documentType}`;
  const res = axiosInstance.post(url, {
    content,
    docId
  });

  return res;
};

export const useCreateComment = ({
  onSuccess,
  onError,
  documentType,
  docId
}: common.useMutationParams & {
  documentType: DocumentType;
  docId: number;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      create({
        content,
        docId,
        documentType
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.COMMENT, documentType, docId]
      });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
