import Calendar from '@mui/icons-material/Event';
import { InputAdornment, SxProps, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import dayjs from 'dayjs';
import * as React from 'react';

import { getOneWeekDateRange } from '@/utils';

export interface DateRangePickerInputProps {
  onChange?: (value: DateRange) => void;
  sx?: SxProps;
  defaultValue?: DateRange;
}

export type DateRange = {
  from?: string;
  to?: string;
};

export const DateRangePickerInput: React.FC<DateRangePickerInputProps> = (
  props
) => {
  const { onChange, sx, defaultValue } = props;
  const [dateRange, setDateRange] = React.useState<DateRange>(
    defaultValue ?? getOneWeekDateRange()
  );
  const handleOnChange = (e: any) => {
    if (Array.isArray(e)) {
      e.map((date, idx) => {
        if (date) {
          if (idx == 0) {
            setDateRange({
              ...dateRange,
              from:
                new Date(date).toISOString().split('T')[0] + 'T00:00:00.000Z'
            });
          }
          if (idx == 1) {
            setDateRange({
              ...dateRange,
              to: new Date(date).toISOString().split('T')[0] + 'T23:59:59.999Z'
            });
          }
        }
      });
    }
  };

  React.useEffect(() => {
    onChange?.(dateRange);
  }, [dateRange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['SingleInputDateRangeField']}>
        <DateRangePicker
          defaultValue={[dayjs(dateRange.from), dayjs(dateRange.to)]}
          slots={{
            field: SingleInputDateRangeField
          }}
          slotProps={{
            textField: {
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="body2">Ngày</Typography>
                  </InputAdornment>
                ),
                endAdornment: <Calendar />
              },
              size: 'small',
              sx
            }
          }}
          onChange={(value: any) => handleOnChange(value)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
