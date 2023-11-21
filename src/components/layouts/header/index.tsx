import { Box } from '@mui/material';
import React from 'react';

import AccountMenu from './account-menu';
import NotiMenu from './noti-menu';

const DefaultHeader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: '300px'
      }}
    >
      <NotiMenu />
      <AccountMenu />
    </Box>
  );
};
export default DefaultHeader;
