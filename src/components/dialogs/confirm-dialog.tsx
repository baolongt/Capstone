import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography
} from '@mui/material';
import { ReactElement } from 'react';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import React from 'react';
import {CustomButton} from '../common';

interface ConfirmDialogProps {
  isOpen: boolean;
  message: ReactElement;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onClose, onConfirm, message }) => {

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: { lg: '500px', md: '500px', xs: '75vw' }
        }
      }}
    >
      <DialogContent>
        <Stack direction={'row'} alignItems={'center'} gap={3}>
          <HelpOutlinedIcon
            sx={{ height: '64px', width: '64px', color: '#FFBC33' }}
          />
          <Box fontSize={'20px'}>
            {message}
            <Typography fontSize={'14px'} mt={1} color="#333">
              Bạn không thể hoàn tác sau bước này
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" onClick={onClose} variant="outlined" />
        <CustomButton label="Đồng ý" onClick={onConfirm} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
