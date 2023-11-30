import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, SxProps, TextField } from '@mui/material';
import React from 'react';

export interface InputSearchProps {
  placeholder?: string;
  size?: 'small' | 'medium';
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps;

  value?: string;
}

export const InputSearch = (props: InputSearchProps) => {
  const { placeholder, onTextChange, size = 'small', sx, value } = props;
  return (
    <TextField
      placeholder={placeholder}
      size={size}
      value={value || ''}
      sx={{
        borderRadius: '2.5',
        border: 'none',
        width: '400px',
        mt: '8px',
        ...sx
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        )
      }}
      onChange={onTextChange}
    />
  );
};
