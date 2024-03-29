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
  minRows?: number;
}

export function MultilineTextField(props: MultilineTextFieldProps) {
  const {
    name,
    label,
    form,
    disabled = false,
    placeholder,
    sx = {},
    minRows,
    ...resProps
  } = props;
  const { control } = form;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            multiline
            label={label ?? ''}
            value={field.value ?? ''}
            placeholder={placeholder}
            disabled={disabled}
            error={Boolean(fieldState?.error?.message)}
            helperText={fieldState?.error?.message}
            FormHelperTextProps={{
              style: {
                margin: 0
              }
            }}
            size="small"
            minRows={minRows ?? 10}
            sx={{ ...sx }}
            {...resProps}
          />
        )}
      />
    </>
  );
}
