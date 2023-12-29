import Calendar from '@mui/icons-material/Event';
import { InputAdornment, SxProps, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import {
  SingleInputDateRangeField,
  SingleInputDateRangeFieldProps
} from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';

import { getOneWeekDateRange } from '@/utils';

type FieldComponent = (<TDate>(
  props: SingleInputDateRangeFieldProps<TDate> &
    React.RefAttributes<HTMLInputElement>
) => React.JSX.Element) & { fieldType?: string };

// eslint-disable-next-line react/display-name
const WrappedSingleInputDateRangeField = React.forwardRef(
  (
    props: SingleInputDateRangeFieldProps<Dayjs>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return <SingleInputDateRangeField size="small" {...props} ref={ref} />;
  }
) as FieldComponent;

WrappedSingleInputDateRangeField.fieldType = 'single-input';

export interface DateRangePickerInputProps {
  onChange?: (value: DateRange) => void;
  sx?: SxProps;
  defaultValue?: DateRange;
  disableFuture?: boolean;
}

export type DateRange = {
  from?: string;
  to?: string;
};

export const DateRangePickerInput: React.FC<DateRangePickerInputProps> = (
  props
) => {
  const { onChange, sx, defaultValue, disableFuture } = props;
  const [dateRange, setDateRange] = React.useState<DateRange>();
  const handleOnChange = (e: any) => {
    if (Array.isArray(e)) {
      e.map((date, idx) => {
        if (date && dayjs(date).isValid()) {
          if (idx == 0) {
            setDateRange({
              ...dateRange,
              from: dayjs(date).startOf('day').toISOString()
            });
          }
          if (idx == 1) {
            setDateRange({
              ...dateRange,
              to: dayjs(date).endOf('day').toISOString()
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
          disableFuture={disableFuture}
          slots={{
            field: WrappedSingleInputDateRangeField
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
