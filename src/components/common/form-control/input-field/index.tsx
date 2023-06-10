import { BaseTextFieldProps, SxProps, TextField } from '@mui/material';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

export interface InputFieldProps extends BaseTextFieldProps {
  name: string;
  label: string;
  form: FieldValues;
  disabled?: boolean;
  placeholder?: string;
  sx?: SxProps;
}

export function InputField(props: InputFieldProps) {
  const { name, label, form, disabled = false, placeholder, sx = {}, ...resProps } = props;
  const { control } = form;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState, formState }) => (
          <TextField
            {...field}
            label={label}
            placeholder={placeholder}
            disabled={disabled}
            error={Boolean(fieldState?.error)}
            helperText={fieldState?.error?.message}
            FormHelperTextProps={{
              style: {
                margin: 0
              }
            }}
            fullWidth
            size='small'
            sx={{ '& input': { py: 1.25 }, ...sx }}
            {...resProps}
          />
        )}
      />
    </>
  );
}