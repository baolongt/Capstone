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
  workflowId?: DocumentTypeCreate;
  steps: EditStep[];
};

const editWorkflow = async (payload: WorkFlowEditPayload) => {
  const url = '/api/workflows/update';
  const res = await axiosInstance.put(url, {
    ...payload,
    id: payload.workflowId
  });

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
      if (docType === DocumentTypeCreate.OUTGOING) {
        queryClient.invalidateQueries({
          queryKey: [api.OUTGOING_DOCUMENT, id]
        });
      } else if (docType === DocumentTypeCreate.INTERNAL) {
        queryClient.invalidateQueries({
          queryKey: [api.INTERNAL_DOCUMENT, id]
        });
      } else if (docType === DocumentTypeCreate.INCOMING) {
        queryClient.invalidateQueries({
          queryKey: [api.INCOMING_DOCUMENT, id]
        });
      }
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
