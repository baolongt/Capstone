import { Box, Paper, SxProps, Typography } from '@mui/material';
import { pieArcClasses, PieChart } from '@mui/x-charts/PieChart';
import * as React from 'react';

import { DateRangePickerInput } from '@/components/common';
import { ChartData } from '@/types';

export type DocumentStatusChartProps = {
  sx: SxProps;
  label: string;
  data: ChartData[];
};

export const DocumentStatusPieChart: React.FC<DocumentStatusChartProps> = ({
  sx,
  label,
  data
}) => {
  return (
    <Box
      sx={{
        height: 360,
        ...sx
      }}
      component={Paper}
    >
      <Box sx={{ width: '95%', textAlign: 'center', mb: 2 }}>
        <Typography
          variant="body1"
          sx={{ fontSize: '24px', fontWeight: 'bold' }}
          color="primary"
        >
          {label.toUpperCase()}
        </Typography>
      </Box>
      <Box sx={{ width: '70%', mx: 'auto' }}>
        <DateRangePickerInput
        // onChange={handleDateRangeOnChange}
        />
      </Box>
      <Box sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 80, additionalRadius: -30 },
              cx: 140
            }
          ]}
          sx={{
            [`& .${pieArcClasses.faded}`]: {
              fill: 'gray'
            },
            '--ChartsLegend-rootOffsetX': '-40px',
            '--ChartsLegend-rootOffsetY': '-20px'
          }}
          height={200}
        />
      </Box>
    </Box>
  );
};
