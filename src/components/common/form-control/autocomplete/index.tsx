import { FormHelperText, SxProps } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Controller, FieldValues } from 'react-hook-form';

import { SelectOption } from '@/types';

interface Props {
  label?: string;
  placeholder?: string;
  data: SelectOption[];
  name: string;
  form: FieldValues;
  sx?: SxProps;
  onSearchChange: (textSearch: string) => void;
}

export default function AutocompleteInput(props: Props) {
  const { data, name, form, onSearchChange, sx, ...resProps } = props;
  const { control } = form;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState }) => (
        <>
          <Autocomplete
            autoHighlight
            disablePortal
            getOptionLabel={(option: SelectOption) => option.title ?? ''}
            sx={{
              '& .MuiOutlinedInput-root': {
                padding: '1px 12px'
              },
              ...sx
            }}
            id="auto-complete"
            options={data}
            renderInput={(params) => (
              <TextField
                onChange={(event) => onSearchChange(event.target.value)}
                {...params}
                error={Boolean(fieldState?.error)}
              />
            )}
            onChange={(event, item) => {
              onChange(item?.value);
            }}
            onClose={() => {
              if (!value || value == -1) {
                onSearchChange('');
                console.debug('close without value choose');
              }
            }}
            {...resProps}
          />
          <FormHelperText color="error.main" sx={{ m: 0, color: '#F52F23' }}>
            {fieldState?.error?.message}
          </FormHelperText>
        </>
      )}
    />
  );
}
