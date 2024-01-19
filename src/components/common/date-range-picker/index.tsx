/* eslint-disable @typescript-eslint/no-explicit-any */
import Calendar from '@mui/icons-material/Event';
import { SxProps } from '@mui/material';
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
  const { onChange, sx, disableFuture } = props;
  const [dateRange, setDateRange] = React.useState<DateRange>();
  const handleOnChange = (e: any) => {
    if (Array.isArray(e) && e.length == 2) {
      setDateRange({
        from: dayjs(e[0]).startOf('day').toISOString(),
        to: dayjs(e[1]).endOf('day').toISOString()
      });
    }
  };

  React.useEffect(() => {
    if (dateRange) {
      onChange?.(dateRange);
    }
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
                // startAdornment: (
                //   <InputAdornment position="start">
                //     <Typography variant="body2">Ngày</Typography>
                //   </InputAdornment>
                // ),
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
