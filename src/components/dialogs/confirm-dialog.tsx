import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography
} from '@mui/material';
import React, { ReactElement } from 'react';

import { CustomButton } from '@/components/common';

export interface ConfirmDialogProps {
  isOpen: boolean;
  message: ReactElement;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message
}) => {
  return (
    <Dialog
      open={isOpen}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: { lg: '500px', md: '500px', xs: '75vw' }
        }
      }}
      onClose={onClose}
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
        <CustomButton label="Hủy bỏ" variant="outlined" onClick={onClose} />
        <CustomButton label="Đồng ý" onClick={onConfirm} />
      </DialogActions>
    </Dialog>
  );
};
