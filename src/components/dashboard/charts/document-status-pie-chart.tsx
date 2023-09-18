import { Box, Paper, styled, SxProps, Typography } from '@mui/material';
import { pieArcClasses, PieChart } from '@mui/x-charts/PieChart';
import * as React from 'react';

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
        height: 300,
        ...sx
      }}
      component={Paper}
    >
      <Box sx={{ width: '95%', textAlign: 'center', mb: 2 }}>
        <Typography variant="body1" sx={{ fontSize: '24px' }}>
          {label}
        </Typography>
      </Box>
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 80, additionalRadius: -30 }
          }
        ]}
        sx={{
          [`& .${pieArcClasses.faded}`]: {
            fill: 'gray'
          }
        }}
        height={200}
      ></PieChart>
    </Box>
  );
};
