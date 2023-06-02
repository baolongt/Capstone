import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Badge
} from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Logout, Settings } from '@mui/icons-material';
import { HEADER_HEIGHT } from '../../../constants/common';
const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: '100%', height: HEADER_HEIGHT, bgcolor: '#0f376b' }}>
      <Stack
        direction={'row'}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          px: '50px',
          height: '100%'
        }}
      >
        <Toolbar>
          <Box
            component={'img'}
            src={
              'https://bloggytalky.com/wp-content/uploads/2017/07/create-a-free-logo-design-logo-designs-design-a-free-logo-design-a-free-logo-alltech-just-free-logo-design.png'
            }
            sx={{ height: '40px', width: '60px', cursor: 'pointer' }}
          />
          <IconButton sx={{ ml: '55px', color: '#fff' }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <Stack direction={'row'} spacing={3}>
          <Badge
            badgeContent={25}
            color="error"
            sx={{ '& .MuiBadge-badge': { top: '6px', right: '4px' } }}
          >
            <NotificationsIcon
              fontSize="large"
              sx={{ color: '#fff', cursor: 'pointer' }}
            />
          </Badge>
          <Avatar
            onClick={handleClick}
            sx={{ width: '32px', height: '32px', cursor: 'pointer' }}
          />
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;
