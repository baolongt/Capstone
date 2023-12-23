import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

import { WorkFlowDocType, WorkFlowStatus } from '.';

type ChangeStatusPayload = {
  id: number | string;
  status: WorkFlowStatus;
  docType: WorkFlowDocType;
};

const changeStatus = async ({ id, status, docType }: ChangeStatusPayload) => {
  const url = `/api/workflows/change-status/${id}?docType=${docType}&&status=${status}`;
  const res = await axiosInstance.put(url);
  return res;
};

export const useChangeStatus = ({
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
    mutationFn: (payload: ChangeStatusPayload) => changeStatus(payload),
    onSuccess: () => {
      if (type === WorkFlowDocType.OUTGOING) {
        queryClient.invalidateQueries({
          queryKey: [api.OUTGOING_DOCUMENT, id]
        });
      } else if (type === WorkFlowDocType.INTERNAL) {
        queryClient.invalidateQueries({
          queryKey: [api.INTERNAL_DOCUMENT, id]
        });
      } else if (type === WorkFlowDocType.INCOMING) {
        queryClient.invalidateQueries({
          queryKey: [api.INCOMING_DOCUMENT, id]
        });
      }
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
