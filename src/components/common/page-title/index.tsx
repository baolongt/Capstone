import { Typography, useTheme } from '@mui/material';
import React from 'react';

type PageTitleProps = {
  label: string;
};
const PageTitle: React.FC<PageTitleProps> = ({ label }) => {
  const theme = useTheme();
  return (
    <Typography sx={{ color: theme.palette.secondary.dark }} variant="h5">
      {label.toUpperCase()}
    </Typography>
  );
};

export default PageTitle;
