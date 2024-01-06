import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { api } from '@/constants';
import { common } from '@/models';
import { DocumentTypeCreate } from '@/models/work-flow';
import { axiosInstance } from '@/utils';

export type CreateStep = {
  handlerId: number;
  action: number;
  stepNumber: number;
  failStepNumber?: number | null;
};

export type Workflow = {
  docId: number;
  docType: DocumentTypeCreate;
  steps: CreateStep[];
};

const createWorkflow = async (payload: Workflow) => {
  const url = '/api/workflows';

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
        queryClient.invalidateQueries({
          queryKey: [api.INCOMING_DOCUMENT]
        });
      } else if (docType === DocumentTypeCreate.INTERNAL) {
        queryClient.invalidateQueries({
          queryKey: [api.INTERNAL_DOCUMENT, id]
        });
        queryClient.invalidateQueries({
          queryKey: [api.INTERNAL_DOCUMENT]
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [api.OUTGOING_DOCUMENT, id]
        });
        queryClient.invalidateQueries({
          queryKey: [api.OUTGOING_DOCUMENT]
        });
      }
      queryClient.invalidateQueries({ queryKey: [api.WORKFLOW] });
      onSuccess?.();
    },
    onError: (error: AxiosError) => {
      onError?.(error?.response?.data);
    }
  });
};
