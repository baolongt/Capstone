import { Box, Paper, SxProps, Typography } from '@mui/material';
import { pieArcClasses, PieChart } from '@mui/x-charts/PieChart';
import * as React from 'react';

import { DateRange, DateRangePickerInput, Loading } from '@/components/common';
import { ChartData } from '@/types';

export type DocumentStatusChartProps = {
  sx: SxProps;
  label: string;
  data: ChartData[];
  isLoading?: boolean;
  handleDateRangeOnChange: (value: DateRange) => void;
};

export const DocumentStatusPieChart: React.FC<DocumentStatusChartProps> = ({
  sx,
  label,
  data,
  isLoading = true,
  handleDateRangeOnChange
}) => {
  return (
    <Box
      sx={{
        height: 420,
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
      {isLoading ? (
        <Loading sx={{ height: '100%' }} />
      ) : (
        <>
          <Box sx={{ width: '55%', mx: 'auto' }}>
            <DateRangePickerInput onChange={handleDateRangeOnChange} />
          </Box>
          <Box sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
            {data && data.length === 0 ? (
              <Typography
                variant="body1"
                sx={{ fontSize: '24px', fontWeight: 'bold', mt: 10 }}
                color="secondary"
              >
                Không có dữ liệu
              </Typography>
            ) : (
              <PieChart
                series={[
                  {
                    data,
                    innerRadius: 90,
                    paddingAngle: 1,
                    cornerRadius: 5,
                    startAngle: -180,
                    endAngle: 180,
                    cx: 140
                  }
                ]}
                sx={{
                  [`& .${pieArcClasses.faded}`]: {
                    fill: 'gray'
                  },
                  '--ChartsLegend-rootOffsetX': '-150px',
                  '--ChartsLegend-rootOffsetY': '-10px'
                }}
                height={250}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
