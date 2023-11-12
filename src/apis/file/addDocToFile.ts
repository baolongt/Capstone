import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

const DocType = {
  1: 'addOutgoingDoc',
  2: 'addIncomingDoc',
  3: 'addInternalDoc'
};

export enum DocTypeEnum {
  OUTGOING = 1,
  INCOMING = 2,
  INTERNAL = 3
}

export type AddDocToFilePayload = {
  docType: DocTypeEnum;
  fileId: number;
  outGoingDocumentId: number;
};

export const addDocToFile = async (
  fileId: number,
  outGoingDocumentId: number,
  docType: DocTypeEnum
) => {
  const url = `/api/files/${DocType[docType]}/${fileId}/${outGoingDocumentId}`;
  return await axiosInstance.post(url);
};

export const useAddDocToFile = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddDocToFilePayload) =>
      addDocToFile(payload.fileId, payload.outGoingDocumentId, payload.docType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.FILE] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
