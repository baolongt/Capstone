import { FormControl, FormHelperText, SxProps } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import { SelectOption } from '@/types';

interface Props {
  label?: string;
  placeholder?: string;
  data: SelectOption[];
  name: string;
  form: FieldValues;
  sx?: SxProps;
}

const PREFIX = 'Autocomplete';
const classes = {
  menuPaper: `${PREFIX}-menuPaper`
};
const Root = styled('div')(() => ({
  [`& .${classes.menuPaper}`]: {
    maxHeight: 160
  }
}));

export default function AutocompleteInput(props: Props) {
  const { label, placeholder, data, name, form, sx = {}, ...resProps } = props;
  const { control } = form;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, fieldState }) => (
        <FormControl fullWidth size="small" sx={{ m: 0, ...sx }}>
          <Autocomplete
            autoHighlight
            disablePortal
            getOptionLabel={(option: SelectOption) => option.title ?? ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                padding: '1px 12px'
              }
            }}
            id="auto-complete"
            options={data}
            renderInput={(params) => (
              <TextField {...params} error={Boolean(fieldState?.error)} />
            )}
            onChange={(event, item) => {
              onChange(item?.value);
            }}
            {...resProps}
          />
          <FormHelperText color="error.main" sx={{ m: 0, color: '#F52F23' }}>
            {fieldState?.error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
