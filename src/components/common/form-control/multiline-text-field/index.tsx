import { BaseTextFieldProps, SxProps, TextField } from '@mui/material';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

export interface MultilineTextFieldProps extends BaseTextFieldProps {
  name: string;
  label?: string;
  form: FieldValues;
  disabled?: boolean;
  placeholder?: string;
  sx?: SxProps;
}

export function MultilineTextField(props: MultilineTextFieldProps) {
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
            error={Boolean(fieldState?.error?.message)}
            helperText={fieldState?.error?.message}
            size='small'
            fullWidth
            multiline
            minRows={10}
            sx={{ ...sx }}
            {...resProps}
          />
        )}
      />
    </>
  );
}