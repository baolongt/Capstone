import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { DocumentTypeCreate } from '@/models/work-flow';
import { axiosInstance } from '@/utils';

export type EditStep = {
  handlerId: number;
  action: number;
  stepNumber: number;
};

export type WorkFlowEditPayload = {
  docType?: DocumentTypeCreate;
  steps: EditStep[];
};

const editWorkflow = async (payload: WorkFlowEditPayload) => {
  const url = '/api/workflows/edit';
  const res = axiosInstance.put(url, payload);

  return res;
};

export const useEditWorkflow = ({
  onSuccess,
  onError,
  docId,
  docType
}: common.useMutationParams & {
  docId: number;
  docType?: DocumentTypeCreate;
}) => {
  const queryClient = useQueryClient();
  const id = docId;
  return useMutation({
    mutationFn: (payload: WorkFlowEditPayload) => editWorkflow(payload),
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
