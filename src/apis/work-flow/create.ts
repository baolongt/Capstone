import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { DocumentTypeCreate } from '@/models/work-flow';
import { axiosInstance } from '@/utils';

export type CreateStep = {
  handlerId: number;
  action: number;
  stepNumber: number;
};

export type Workflow = {
  docId: number;
  docType: DocumentTypeCreate;
  steps: CreateStep[];
};

const createWorkflow = async (payload: Workflow) => {
  const url = '/api/workflows';

  console.log('payload create flow', payload);
  const res = await axiosInstance.post(url, payload);

  return res;
};

export const useCreateWorkflow = ({
  onSuccess,
  onError,
  id,
  docType
}: common.useMutationParams & {
  id: number;
  docType: DocumentTypeCreate;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Workflow) => createWorkflow(payload),
    onSuccess: () => {
      if (docType === DocumentTypeCreate.INCOMING) {
        queryClient.invalidateQueries({
          queryKey: [api.INCOMING_DOCUMENT, id]
        });
      } else if (docType === DocumentTypeCreate.INTERNAL) {
        queryClient.invalidateQueries({
          queryKey: [api.INTERNAL_DOCUMENT, id]
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [api.OUTGOING_DOCUMENT, id]
        });
      }
      queryClient.invalidateQueries({ queryKey: [api.WORKFLOW] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
