import { DateTimePickerProps } from '@mui/lab';
import { Box, SxProps } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';

type BasicDateTimePickerProps = {
  label: string;
  sx: SxProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & DateTimePickerProps<any>;

export default function DateTimePickerInput({
  label = '',
  sx,
  ...rest
}: BasicDateTimePickerProps) {
  return (
    <Box sx={sx}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker
            slotProps={{ textField: { size: 'small', label: label } }}
            {...rest}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}
