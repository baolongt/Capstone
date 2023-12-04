import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

import { WorkFlowDocType } from '.';

type RollbackPayload = {
  workflowId: number;
  stepNumber: number;
  reason: string;
};
const rollback = async ({
  workflowId,
  stepNumber,
  reason
}: RollbackPayload) => {
  const url = `/api/workflows/rollback/${workflowId}/${stepNumber}`;
  const res = await axiosInstance.put(url, {
    reason
  });
  return res;
};

export const useRollback = ({
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
    mutationFn: rollback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.OUTGOING_DOCUMENT, id] });
      queryClient.invalidateQueries({
        queryKey: [api.WORKFLOW, docId, docType]
      });
      queryClient.invalidateQueries({
        queryKey: [api.NOTIFICATION]
      });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
