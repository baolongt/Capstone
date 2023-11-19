import { useQuery } from '@tanstack/react-query';

import { DateRange } from '@/components/common';
import { api } from '@/constants';
import { DashboardStatus } from '@/models/dashboard-status';
import { axiosInstance } from '@/utils';

type listStatusOutgoingDocumentResponse = {
  data: DashboardStatus[];
};

export const listStatusOutgoingDocument = async ({ from, to }: DateRange) => {
  const response: listStatusOutgoingDocumentResponse = await axiosInstance.get(
    `/api/dashboard/count-status/outgoing-document?from=${from}&to=${to}`
  );

  return response.data;
};

export const useListStatusOutgoingDocument = ({ from, to }: DateRange) => {
  return useQuery({
    queryKey: [api.OUTGOING_DOCUMENT_STATUS_DASHBORD],
    queryFn: () => listStatusOutgoingDocument({ from, to }),
    keepPreviousData: true
  });
};
