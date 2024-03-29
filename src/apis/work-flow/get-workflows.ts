import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { Action, Status } from '@/models/work-flow';
import { axiosInstance } from '@/utils';

import { WorkFlowDocType } from '.';

type GetWorkFlowsPayload = {
  docType: WorkFlowDocType;
  docId: number;
};

export type Step = {
  id: number;
  handlerId: number;
  handlerName: string;
  status: Status;
  action: Action;
  stepNumber: number;
  deadline: string | null;
  failStepNumber?: number | null;
};

export type GetWorkFlowsResponse = {
  id: number;
  docId: number;
  docType: number;
  steps: Step[];
};

const getWorkFlows = async ({ docId, docType }: GetWorkFlowsPayload) => {
  const url = `/api/workflows/get-by-doc/doc-type/${docType}/${docId}`;
  const res: {
    data: GetWorkFlowsResponse;
  } = await axiosInstance.get(url);

  return res.data;
};

export const useGetWorkFlows = ({ docId, docType }: GetWorkFlowsPayload) => {
  return useQuery<GetWorkFlowsResponse, Error>({
    queryKey: [api.WORKFLOW, docId, docType],
    queryFn: () => getWorkFlows({ docId, docType }),
    keepPreviousData: true
  });
};
