import { Button, ButtonProps, CircularProgress, useTheme } from '@mui/material';
import * as React from 'react';

export const LoadingButton: React.FC<ButtonProps> = (props) => {
  const { children } = props;
  const theme = useTheme();
  const color = theme.palette.primary.contrastText;
  return (
    <Button
      {...props}
      startIcon={<CircularProgress size="1.2rem" style={{ color }} />}
    >
      {children}
    </Button>
  );
};
