import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

const DocType = {
  outgoing: 'removeOutgoingDoc',
  incoming: 'removeIncomingDoc',
  internal: 'removeInternalDoc'
};

export type RemoveDocFromFilePayload = {
  docType: 'outgoing' | 'incoming' | 'internal';
  fileId: number;
  outGoingDocumentId: number;
};

export const removeDocFromFile = async (
  fileId: number,
  outGoingDocumentId: number,
  docType: 'outgoing' | 'incoming' | 'internal'
) => {
  const url = `/api/files/${DocType[docType]}/${fileId}/${outGoingDocumentId}`;
  return await axiosInstance.post(url);
};

export const useRemoveDocFromFile = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RemoveDocFromFilePayload) =>
      removeDocFromFile(
        payload.fileId,
        payload.outGoingDocumentId,
        payload.docType
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.FILE] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
