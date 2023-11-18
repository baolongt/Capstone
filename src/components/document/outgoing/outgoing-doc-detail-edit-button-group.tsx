import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditButtonGroup = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        onClick={handleClick}
      >
        Chỉnh sửa
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate('edit')}>Thông tin văn bản</MenuItem>
        <MenuItem onClick={() => navigate('edit-workflow')}>
          Trình xử lý
        </MenuItem>
        <MenuItem onClick={() => navigate('edit-publish-info')}>
          Thông tin phát hành
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default EditButtonGroup;
