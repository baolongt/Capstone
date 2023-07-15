import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

import { CustomButton, DragDropFile } from '@/components/common';

export interface ImportFileDialogProps {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

export const ImportFileDialog = (props: ImportFileDialogProps) => {
  const { isOpen, onClose, onSubmit } = props;
  const form = useForm({
    defaultValues: {
      file: ''
    }
  });
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
      <DialogTitle fontWeight={600}>Upload File CSV</DialogTitle>

      <DialogContent>
        <DragDropFile
          form={form}
          name="file"
          accept={'.csv'}
          placeholder="Kéo thả file hoặc click chọn"
          preview={true}
          icon={<AttachFileOutlinedIcon />}
        />
      </DialogContent>

      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" variant="outlined" onClick={onClose} />
        <CustomButton label="Upload" onClick={onSubmit} />
      </DialogActions>
    </Dialog>
  );
};

export default ImportFileDialog;
