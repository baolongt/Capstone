import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useListStatusOutgoingDocument } from '@/apis/dashboard/list-status-outgoing-document';
import { DateRange } from '@/components/common';
import { DocumentStatusPieChart } from '@/components/dashboard';
import { DEFAULT_PAGE_WIDTH, StatusCorlorDict, StatusDict } from '@/constants';
import { DashboardStatus } from '@/models/dashboard-status';
import { getOneWeekDateRange } from '@/utils';

const data = [
  { id: 1, value: 15, label: 'Trễ hạn ký', color: '#e8eaf6' },
  { id: 2, value: 20, label: 'Chờ ký', color: '#9fa8da' },
  { id: 2, value: 20, label: 'Đã xử lý', color: '#5c6bc0' }
];

const convertResponseDataToChartData = (data?: DashboardStatus[]) => {
  if (!data) return [];
  return data.map((item, index) => ({
    id: index,
    value: item.number,
    label: StatusDict[item.status],
    color: StatusCorlorDict[item.status]
  }));
};

const Dashboard = () => {
  const [odDateFilter, setOdDateFilter] = useState<DateRange>(
    getOneWeekDateRange()
  );
  const {
    refetch: refetchOd,
    data: odData,
    isLoading: odLoading
  } = useListStatusOutgoingDocument(odDateFilter);
  const handleOdDateFilterChange = (value: DateRange) => {
    setOdDateFilter(value);
  };

  useEffect(() => {
    refetchOd();
  }, [odDateFilter, refetchOd]);

  return (
    <Box sx={{ p: 1, mx: 'auto', width: DEFAULT_PAGE_WIDTH }}>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction={{ xs: 'column', sm: 'row' }}
        useFlexGap={true}
        flexWrap="wrap"
        sx={{ mt: 5, justifyContent: 'space-between' }}
      >
        <DocumentStatusPieChart
          label="Văn bản đi"
          data={convertResponseDataToChartData(odData)}
          sx={{ width: '45%', p: 3 }}
          isLoading={odLoading}
          handleDateRangeOnChange={handleOdDateFilterChange}
        />
        <DocumentStatusPieChart
          label="Văn bản đến"
          data={data}
          sx={{ width: '45%', p: 3 }}
          handleDateRangeOnChange={handleOdDateFilterChange}
        />
      </Stack>
    </Box>
  );
};

export default Dashboard;
