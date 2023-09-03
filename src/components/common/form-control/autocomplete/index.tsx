import { FormHelperText, SxProps } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';
import { Controller, FieldValues } from 'react-hook-form';

import { DEBOUND_SEARCH_TIME } from '@/constants';
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
  const {
    label,
    placeholder,
    data,
    name,
    form,
    onSearchChange,
    sx = {},
    ...resProps
  } = props;
  const { control } = form;
  const search = debounce(onSearchChange, DEBOUND_SEARCH_TIME);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, fieldState }) => (
        <>
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
              <TextField
                onChange={(event) => onSearchChange(event.target.value)}
                {...params}
                error={Boolean(fieldState?.error)}
              />
            )}
            onChange={(event, item) => {
              console.log('change...');
              onChange(item?.value);
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
