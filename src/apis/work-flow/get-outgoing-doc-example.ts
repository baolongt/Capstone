import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { workFlow } from '@/models';
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

const getOutgoingExampleWorkflow = async (
  docType: workFlow.DocumentTypeCreate
) => {
  let url = '';

  switch (docType) {
    case workFlow.DocumentTypeCreate.OUTGOING:
      url = '/api/workflows/outgoingdocumet-example';
      break;
    case workFlow.DocumentTypeCreate.INCOMING:
      url = '/api/workflows/incomingdocumet-example';
      break;
    case workFlow.DocumentTypeCreate.INTERNAL:
      url = '/api/workflows/internaldocumet-example';
      break;
    default:
      break;
  }

  const {
    data: { steps }
  }: GetExampleWorkflowResponse = await axiosInstance.get(url);

  return steps;
};

type UseGetExampleWorkflowPayload = {
  docType: workFlow.DocumentTypeCreate;
};

export const useGetExampleWorkflow = ({
  docType
}: UseGetExampleWorkflowPayload) => {
  return useQuery<Step[], Error>({
    queryKey: [api.WORKFLOW_EXAMPLE, docType],
    queryFn: () => getOutgoingExampleWorkflow(docType),
    keepPreviousData: true
  });
};
