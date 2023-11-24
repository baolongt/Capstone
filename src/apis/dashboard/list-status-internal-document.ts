import { useQuery } from '@tanstack/react-query';

import { DateRange } from '@/components/common';
import { api } from '@/constants';
import { DashboardStatus } from '@/models/dashboard-status';
import { axiosInstance } from '@/utils';

type listStatusOutgoingDocumentResponse = {
  data: DashboardStatus[];
};

export const listStatusInternalDocument = async ({ from, to }: DateRange) => {
  const response: listStatusOutgoingDocumentResponse = await axiosInstance.get(
    `/api/dashboard/count-status/internal-document?from=${from}&to=${to}`
  );

  return response.data;
};

export const useListStatusInternalDocument = ({ from, to }: DateRange) => {
  return useQuery({
    queryKey: [api.INTERNAL_DOCUMENT_STATUS_DASHBORD],
    queryFn: () => listStatusInternalDocument({ from, to }),
    keepPreviousData: true
  });
};
