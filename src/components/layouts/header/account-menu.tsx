import { Logout } from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogout } from '@/apis/auth/logout';
import useAuth from '@/hooks/useAuth';

const AccountMenu = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { setAuthState } = auth;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = auth.authState.user?.name;

  const { mutate: logout } = useLogout({
    onSuccess: () => {
      setAuthState({
        isAuthenticated: false,
        user: null
      });
      localStorage.clear();
      navigate('/');
    },
    onError: () => {
      localStorage.clear();
      navigate('/');
    }
  });

  return (
    <>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.charAt(0) || 'User'}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
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
        onClose={handleClose}
      >
        <MenuItem>
          <Avatar /> Thông tin tài khoản
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
