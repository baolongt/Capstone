import 'dayjs/locale/vi';

import { BaseTextFieldProps, SxProps } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import * as React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import { TIMEZONE } from '@/constants';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface DatePickerFieldProps extends BaseTextFieldProps {
  name: string;
  label?: string;
  sx?: SxProps;
  disabled?: boolean;
  minDate?: any;
  maxDate?: any;
  form: FieldValues;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = (props) => {
  const { label, sx, form, disabled, name, minDate, maxDate, ...rest } = props;
  const { control } = form;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <LocalizationProvider adapterLocale={'vi'} dateAdapter={AdapterDayjs}>
          <DatePicker
            minDate={minDate}
            maxDate={maxDate}
            label={label || ''}
            value={field.value ? dayjs(field.value) : null}
            slotProps={{
              textField: {
                disabled: disabled,
                error: Boolean(fieldState?.error),
                helperText: fieldState?.error?.message,
                size: 'small',
                sx: { ...sx },
                fullWidth: true,
                ...rest
              }
            }}
            onChange={(value, _) => {
              field.onChange(dayjs.tz(value, TIMEZONE).format());
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};
