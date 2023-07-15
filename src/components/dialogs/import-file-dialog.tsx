import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';
import { CustomButton, WrappedDragDropFileBox } from '../common';
import DragAndDropBox from '../document/outgoing/DragAndDropBox';
import { useForm } from 'react-hook-form';
import DragDropFile from '../common/form-control/drag-drop-file';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
interface ImportFileDialogProps {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

const ImportFileDialog = (props: ImportFileDialogProps) => {
  const { isOpen, onClose, onSubmit } = props;
  const form = useForm({
    defaultValues: {
      file: ''
    }
  });
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
      <DialogTitle fontWeight={600}>Upload File CSV</DialogTitle>

      <DialogContent>
        <DragDropFile
          form={form}
          name='file'
          accept = {'.csv'}
          placeholder='Kéo thả file hoặc click chọn'
          preview = {true}
          icon={<AttachFileOutlinedIcon/>}
        />
      </DialogContent>

      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" onClick={onClose} variant="outlined" />
        <CustomButton label="Upload" onClick={onSubmit} />
      </DialogActions>
    </Dialog>
  );
};

export default ImportFileDialog;
