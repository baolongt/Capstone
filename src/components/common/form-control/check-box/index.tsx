import { Checkbox, CheckboxProps } from '@mui/material';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

export interface BaseCheckboxProps extends CheckboxProps {
  name: string;
  formHook: FieldValues;
}

export function BaseCheckbox(props: BaseCheckboxProps) {
  const { name, formHook, ...resProps } = props;
  const { control } = formHook;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Checkbox {...field} size="small" {...resProps} />
        )}
      />
    </>
  );
}
