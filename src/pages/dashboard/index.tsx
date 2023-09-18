import { Box, Stack } from '@mui/material';
import React from 'react';

import { DocumentStatusPieChart } from '@/components/dashboard';
import { DEFAULT_PAGE_WIDTH } from '@/constants';

const data = [
  { id: 1, value: 15, label: 'Trễ hạn ký', color: '#e8eaf6' },
  { id: 2, value: 20, label: 'Chờ ký', color: '#9fa8da' },
  { id: 2, value: 20, label: 'Đã xử lý', color: '#5c6bc0' }
];

const Dashboard = () => {
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
          data={data}
          sx={{ width: '45%', p: 3 }}
        />
        <DocumentStatusPieChart
          label="Văn bản đến"
          data={data}
          sx={{ width: '45%', p: 3 }}
        />
      </Stack>
    </Box>
  );
};

export default Dashboard;
