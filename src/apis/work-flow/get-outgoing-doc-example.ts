import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { Action } from '@/models/work-flow';
import { axiosInstance } from '@/utils';

type Step = {
  handlerId: number;
  action: Action;
  stepNumber: number;
};
type GetExampleWorkflowResponse = {
  data: {
    steps: Step[];
  };
};

const getOutgoingExampleWorkflow = async () => {
  const url = '/api/workflows/outgoingdocumet-example';
  const {
    data: { steps }
  }: GetExampleWorkflowResponse = await axiosInstance.get(url);

  return steps;
};

export const useGetOutgoingExampleWorkflow = () => {
  return useQuery<Step[], Error>({
    queryKey: [api.WORKFLOW, 'outgoingdocumet-example'],
    queryFn: getOutgoingExampleWorkflow,
    keepPreviousData: true
  });
};
