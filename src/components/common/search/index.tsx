import { SxProps, TextField, useTheme } from '@mui/material';
import React from 'react';

export interface InputSearchProps {
  placeholder?: string;
  size?: 'small' | 'medium';
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps;
}

export const InputSearch = (props: InputSearchProps) => {
  const { placeholder, onTextChange, size = 'small', sx } = props;
  const theme = useTheme();
  return (
    <TextField
      placeholder={placeholder}
      size={size}
      sx={{
        bgcolor: theme.palette.common.white,
        borderRadius: '2.5',
        boxShadow: 'rgba(3, 3, 3, 0.1) 0px 0px 10px',
        border: 'none',
        width: '400px',
        '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': { border: 'none' },
        ...sx
      }}
      onChange={onTextChange}
    />
  );
};
