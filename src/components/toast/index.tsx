import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { ToastContentProps } from 'react-toastify';

export interface ToastMessageComponentProps extends Partial<ToastContentProps> {
  title?: string;
  message: React.ReactNode;
}

export function ToastMessage({
  message,
  title,
  ...rest
}: ToastMessageComponentProps) {
  const toastTitle = useMemo(() => {
    switch (rest?.toastProps?.type) {
      case 'success':
        return 'Thành công';

      case 'error':
        return 'Lỗi';

      default:
        return '';
    }
  }, [rest?.toastProps?.type]);

  return (
    <Box px={1} py={1.2}>
      {Boolean(title) && <Typography fontWeight={700}>{title}</Typography>}
      {!title && <Typography fontWeight={700}>{toastTitle}</Typography>}
      <Box>{message}</Box>
    </Box>
  );
}
