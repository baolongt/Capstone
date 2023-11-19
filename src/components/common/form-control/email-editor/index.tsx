import 'react-quill/dist/quill.snow.css';

import { FormHelperText, SxProps, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import ReactQuill from 'react-quill';

interface Props {
  name: string;
  form: FieldValues;
  sx?: SxProps;
}

export default function EmailInput(props: Props) {
  const { name, form, sx } = props;
  const { control } = form;
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box sx={sx}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState }) => {
          console.log('fieldState', fieldState);
          return (
            <>
              <ReactQuill
                style={{
                  height: '100%',
                  border: isFocused
                    ? `1px solid ${theme.palette.primary.main}`
                    : fieldState?.error?.message
                    ? `1px solid ${theme.palette.error.main}`
                    : ''
                }}
                theme="snow"
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={onChange}
              />
              <FormHelperText
                color="error.main"
                sx={{ m: 0, color: '#F52F23' }}
              >
                {fieldState?.error?.message}
              </FormHelperText>
            </>
          );
        }}
      />
    </Box>
  );
}
