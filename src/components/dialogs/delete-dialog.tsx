import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography
} from '@mui/material';

import { CustomButton } from '../common';

export interface DeleteDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}
const DeleteDialog = (props: DeleteDialogProps) => {
  const { isOpen, message, onClose, onConfirm } = props;
  return (
    <Dialog
      open={isOpen}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: {
            lg: '400px',
            md: '400px',
            xs: '75vw',
            borderRadius: '0px'
          }
        }
      }}
      onClose={onClose}
    >
      <DialogContent sx={{ py: '24px' }}>
        <Typography
          sx={{ fontSize: '18px', fontWeight: 600, textAlign: 'center' }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{ display: 'flex', justifyContent: 'center', pb: '24px' }}
      >
        <CustomButton label="Hủy" variant="outlined" onClick={onClose} />
        <CustomButton label="Xoá" onClick={onConfirm} />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
