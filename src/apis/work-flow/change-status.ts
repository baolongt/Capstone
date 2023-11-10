import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { axiosInstance } from '@/utils';

import { WorkFlowDocType, WorkFlowStatus } from '.';

type ChangeStatusPayload = {
  id: number;
  status: WorkFlowStatus;
  docType: WorkFlowDocType;
};

const changeStatus = async ({ id, status, docType }: ChangeStatusPayload) => {
  const url = `/api/workflows/change-status/${id}`;
  const res = axiosInstance.put(url, {
    status,
    docType
  });
  return res;
};

export const useChangeStatus = ({
  onSuccess,
  onError,
  id
}: common.useMutationParams & {
  id: number;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ChangeStatusPayload) => changeStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.OUTGOING_DOCUMENT, id] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
