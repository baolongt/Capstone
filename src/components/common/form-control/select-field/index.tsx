import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
  SxProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import { SelectOption } from '@/types';

const PREFIX = 'SelectField';
const classes = {
  menuPaper: `${PREFIX}-menuPaper`
};
const Root = styled('div')(() => ({
  [`& .${classes.menuPaper}`]: {
    maxHeight: 160
  }
}));

export interface SelectFieldProps extends SelectProps {
  data: Array<SelectOption>;
  name: string;
  label?: string;
  form: FieldValues;
  disabled?: boolean;
  placeholder?: string;
  sx?: SxProps;
}

export function SelectField(props: SelectFieldProps) {
  const {
    data,
    name,
    label,
    form,
    disabled = false,
    placeholder,
    sx = {},
    ...resProps
  } = props;

  const { control } = form;
  return (
    <Root>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <FormControl
            fullWidth
            size="small"
            disabled={disabled}
            sx={{ m: 0, ...sx }}
          >
            <Select
              {...field}
              label={label ?? ''}
              disabled={disabled}
              placeholder={placeholder}
              error={Boolean(fieldState?.error)}
              MenuProps={{ classes: { paper: classes.menuPaper } }}
              value={field.value ?? ''}
              {...resProps}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Box component="span" sx={{ opacity: 0.4 }}>
                      {placeholder}
                    </Box>
                  );
                }
                return (
                  data?.find((item) => item.value === selected)?.title ?? ''
                );
              }}
            >
              {data?.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.value}
                  // sx={{
                  //   fontSize: '14px',
                  //   textOverflow: 'ellipsis',
                  //   WebkitLineClamp: 1,
                  //   WebkitBoxOrient: 'vertical',
                  //   display: '-webkit-box',
                  //   overflow: 'hidden',
                  //   cursor: 'pointer',
                  //  TODO : if enable this please get maxWidth from xs in props
                  //   maxWidth: '450px'
                  // }}
                >
                  {item.title}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText color="error.main" sx={{ m: 0, color: '#F52F23' }}>
              {fieldState?.error?.message}
            </FormHelperText>
          </FormControl>
        )}
      />
    </Root>
  );
}
