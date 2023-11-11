import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/constants';
import { common } from '@/models';
import { DocumentTypeCreate } from '@/models/work-flow';
import { axiosInstance } from '@/utils';

type Step = {
  handlerId: number;
  action: number;
  stepNumber: number;
};

export type Workflow = {
  docId: number;
  docType: DocumentTypeCreate.OUTGOING;
  steps: Step[];
};

const createWorkflow = async (payload: Workflow) => {
  const url = '/api/workflows';

  console.log('payload create flow', payload);
  const res = axiosInstance.post(url, payload);

  return res;
};

export const useCreateWorkflow = ({
  onSuccess,
  onError
}: common.useMutationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Workflow) => createWorkflow(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.WORKFLOW] });
      onSuccess?.();
    },
    onError: () => {
      onError?.();
    }
  });
};
