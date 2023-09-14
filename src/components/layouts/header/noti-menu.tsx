import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

import { useListNotifications } from '@/apis';
import { notification } from '@/models';

type NotiItemProps = {
  notification: notification.Notification;
  onClick?: () => void;
};

const NotiItem: React.FC<NotiItemProps> = ({ notification, onClick }) => {
  const { title, description, createdDate } = notification;
  return (
    <MenuItem onClick={onClick}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          p: 1
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
        <Typography variant="caption">
          {dayjs(createdDate).format('HH:mm DD/MM')}
        </Typography>
        <Typography>{description}</Typography>
      </Box>
    </MenuItem>
  );
};

type NotiListItems = {
  notifications: notification.Notification[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
};
const NotiListItems: React.FC<NotiListItems> = ({
  notifications,
  fetchNextPage,
  hasNextPage,
  isFetching
}) => {
  return (
    <>
      {notifications.map((notification, index) => (
        <NotiItem key={index} notification={notification} />
      ))}
      {hasNextPage && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <LoadingButton
            loading={isFetching}
            variant="text"
            onClick={(e) => {
              e.preventDefault();
              fetchNextPage();
            }}
          >
            Xem thêm
          </LoadingButton>
        </Box>
      )}
    </>
  );
};

const NotiMenu = () => {
  const [queryParams, setQueryParams] = React.useState({
    page: 1,
    size: 5
  });

  const { data, hasNextPage, fetchNextPage, isFetching } = useListNotifications(
    {
      queryParams
    }
  );
  const handleFetchNextPage = () => {
    setQueryParams({
      ...queryParams,
      page: queryParams.page + 1
    });
  };

  const [notifications, setNotifications] = React.useState<
    notification.Notification[]
  >([]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (data && data.pages) {
      const noti = data.pages.map((res) => res.data).flat();
      setNotifications(noti);
    }
  }, [data]);

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage, queryParams]);
  return (
    <>
      <Box>
        <Tooltip title="Notifications">
          <IconButton
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            id="noti-button"
            onClick={handleClick}
          >
            <NotificationsNoneOutlinedIcon sx={{ width: 32, height: 32 }} />
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
        sx={{
          '& .MuiMenu-paper': {
            maxHeight: '200px',
            minWidth: '400px',
            maxWidth: '500px',
            overflow: 'auto'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClose={handleClose}
      >
        {notifications.length > 0 ? (
          <NotiListItems
            hasNextPage={hasNextPage || false}
            fetchNextPage={handleFetchNextPage}
            isFetching={isFetching}
            notifications={notifications}
          />
        ) : (
          <Box
            sx={{
              justifyContent: 'center',
              display: 'flex',
              py: 10
            }}
          >
            <Typography color="secondary">Không có thông báo</Typography>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default NotiMenu;
