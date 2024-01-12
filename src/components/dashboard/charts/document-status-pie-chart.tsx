import { Box, Paper, SxProps, Typography } from '@mui/material';
import {
  pieArcClasses,
  pieArcLabelClasses,
  PieChart
} from '@mui/x-charts/PieChart';
import * as React from 'react';

import { DateRange, DateRangePickerInput, Loading } from '@/components/common';
import theme from '@/components/theme/theme';
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
  const total = data.reduce((total, item) => {
    return total + item.value;
  }, 0);

  return (
    <Box
      sx={{
        height: 380,
        ...sx
      }}
      component={Paper}
    >
      <Box sx={{ width: '100%', textAlign: 'center', mb: 1 }}>
        <Typography
          variant="body1"
          sx={{ fontSize: '20px', fontWeight: 'bold' }}
          color={theme.palette.grey[700]}
        >
          {label}
        </Typography>
      </Box>
      {isLoading ? (
        <Loading sx={{ height: '100%' }} />
      ) : (
        <>
          <Box sx={{ width: '70%', mx: 'auto' }}>
            <DateRangePickerInput
              sx={{
                '&.MuiTextField-root': {
                  minWidth: 1
                },
                '& .MuiOutlinedInput-input': {
                  fontSize: '14px',
                  px: 1,
                  width: 'auto'
                },
                '& .MuiSvgIcon-root': {
                  color: theme.palette.primary.main,
                  cursor: 'pointer'
                }
              }}
              onChange={handleDateRangeOnChange}
            />
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
                    innerRadius: 95,
                    paddingAngle: 1,
                    cornerRadius: 5,
                    startAngle: -180,
                    endAngle: 180,

                    arcLabel: (item) =>
                      `${Math.trunc((item.value / total) * 100)}%`
                  }
                ]}
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: {
                      vertical: 'bottom',
                      horizontal: 'middle'
                    },
                    itemMarkWidth: 14,
                    itemMarkHeight: 12,
                    markGap: 5,
                    itemGap: 8,
                    labelStyle: {
                      fontSize: 12,
                      fill: theme.palette.secondary.dark
                    }
                  }
                }}
                sx={{
                  [`& .${pieArcClasses.faded}`]: {
                    fill: 'gray'
                  },
                  '--ChartsLegend-rootOffsetX': '-10px',
                  '--ChartsLegend-rootOffsetY': '-100px',
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                    fontSize: 10
                  }
                }}
                height={250}
                margin={{ top: 0, bottom: 40, left: 100 }}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
