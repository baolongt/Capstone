import { Box, MenuItem, Stack } from '@mui/material';
import React from 'react';
import { Path } from '../../../models/path';
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '../../../constants/common';
import paths from '../../../constants/routes';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: `calc(100vh - ${HEADER_HEIGHT})`,
        bgcolor: '#fff',
        paddingTop: 3,
        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
      }}
    >
      <Stack>
        {paths.map((path: Path, i) => (
          <NavLink key={i} to={path.path}>
            <MenuItem>
              <Stack
                direction={'row'}
                gap={1}
                sx={{ fontSize: '14px', alignItems: 'center', gap: 1 }}
              >
                {path.icon}
                {path.label}
              </Stack>
            </MenuItem>
          </NavLink>
        ))}
      </Stack>
    </Box>
  );
};

export default Sidebar;
