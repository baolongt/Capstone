import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';

export interface LoadingProps {
  sx?: SxProps;
}

export const Loading: React.FC<LoadingProps> = ({ sx }) => {
  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx
      }}
    >
      <CircularProgress />
    </Box>
  );
};
