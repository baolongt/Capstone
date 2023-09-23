import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useListStatusOutgoingDocument } from '@/apis/dashboard/list-status-outgoing-document';
import { DateRange } from '@/components/common';
import { DocumentStatusPieChart } from '@/components/dashboard';
import { DEFAULT_PAGE_WIDTH, StatusCorlorDict, StatusDict } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { DashboardStatus } from '@/models/dashboard-status';
import { getOneWeekDateRange } from '@/utils';

const mockData = [
  {
    status: 0,
    number: 2
  },
  {
    status: 1,
    number: 7
  },
  {
    status: 2,
    number: 7
  },
  {
    status: 3,
    number: 2
  },
  {
    status: 4,
    number: 2
  },
  {
    status: 5,
    number: 7
  },
  {
    status: 6,
    number: 2
  }
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
  const {
    authState: { user }
  } = useAuth();

  useEffect(() => {
    refetchOd();
  }, [odDateFilter, refetchOd]);

  return (
    <Box sx={{ p: 1, mx: 'auto', width: DEFAULT_PAGE_WIDTH }}>
      <Typography sx={{ mt: 2 }} variant="h4" fontWeight="bold">
        {`Welcome ${user?.name} !` || ''}
      </Typography>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction={{ xs: 'column', sm: 'row' }}
        useFlexGap={true}
        flexWrap="wrap"
        sx={{ mt: 5, justifyContent: 'space-between' }}
      >
        <DocumentStatusPieChart
          label="Thống kê văn bản đi"
          data={convertResponseDataToChartData(odData)}
          sx={{ width: '60%', p: 3 }}
          isLoading={odLoading}
          handleDateRangeOnChange={handleOdDateFilterChange}
        />
        <DocumentStatusPieChart
          label="Thống kê văn bản đến"
          data={convertResponseDataToChartData(mockData)}
          sx={{ width: '60%', p: 3 }}
          handleDateRangeOnChange={handleOdDateFilterChange}
        />
      </Stack>
    </Box>
  );
};

export default Dashboard;
