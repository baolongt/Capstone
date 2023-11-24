import { useQuery } from '@tanstack/react-query';

import { DateRange } from '@/components/common';
import { api } from '@/constants';
import { DashboardStatus } from '@/models/dashboard-status';
import { axiosInstance } from '@/utils';

type listStatusOutgoingDocumentResponse = {
  data: DashboardStatus[];
};

export const listStatusIncomingDocument = async ({ from, to }: DateRange) => {
  const response: listStatusOutgoingDocumentResponse = await axiosInstance.get(
    `/api/dashboard/count-status/incoming-document?from=${from}&to=${to}`
  );

  return response.data;
};

export const useListStatusIncomingDocument = ({ from, to }: DateRange) => {
  return useQuery({
    queryKey: [api.INCOMING_DOCUMENT_STATUS_DASHBORD],
    queryFn: () => listStatusIncomingDocument({ from, to }),
    keepPreviousData: true
  });
};
