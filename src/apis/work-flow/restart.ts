import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

import { WorkFlowDocType } from '.';

type RestartStatusPayload = {
  id: number | string;
  docType: WorkFlowDocType;
};

const restartStauts = async ({ id, docType }: RestartStatusPayload) => {
  const url = `/api/workflows/restart/document/doc-type/${docType}/${id}`;
  const res = axiosInstance.post(url);
  return res;
};

export const useRestartStatus = ({
  onSuccess,
  onError,
  id,
  type
}: common.useMutationParams & {
  id: number;
  type: WorkFlowDocType;
}) => {
  const queryClient = useQueryClient();
  const docId = id;
  const docType = type;
  return useMutation({
    mutationFn: (payload: RestartStatusPayload) => restartStauts(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.OUTGOING_DOCUMENT, id] });
      queryClient.invalidateQueries({
        queryKey: [api.WORKFLOW, docId, docType]
      });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
