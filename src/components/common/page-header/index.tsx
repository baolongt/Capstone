import { Box, useTheme } from '@mui/material';
import React from 'react';

import { DEFAULT_PAGE_WIDTH } from '@/constants';

type PageHeaderProps = {
  children?: React.ReactNode;
};

const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      bgcolor="#fff"
      sx={{ mb: 3, borderBottom: `1px solid ${theme.palette.divider}` }}
    >
      <Box sx={{ pt: 4, pb: 2, mx: 'auto', width: DEFAULT_PAGE_WIDTH }}>
        {children}
      </Box>
    </Box>
  );
};

export default PageHeader;
