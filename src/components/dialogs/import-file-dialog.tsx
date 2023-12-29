import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { Accept } from 'react-dropzone';
import { useForm } from 'react-hook-form';

import { CustomButton } from '@/components/common';
import { UploadFile } from '@/models';

import { WrappedDragDropFile } from '../common/form-control/drag-drop-file';

const fileAccpetType: Accept = {
  'text/csv': ['.csv']
};

export interface ImportFileDialogProps {
  isOpen: boolean;
  onSubmit: (file: File) => void;
  onClose: () => void;
}

export const ImportFileDialog = (props: ImportFileDialogProps) => {
  const { isOpen, onClose, onSubmit } = props;
  const form = useForm<{
    file: UploadFile | null;
  }>({
    defaultValues: {
      file: null
    }
  });
  const handleSubmit = () => {
    console.log('values', form.getValues());
    const { file } = form.getValues();
    if (file && file.fileObj) {
      onSubmit(file.fileObj);
    }
  };
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
      <DialogTitle fontWeight={600}>Thêm bằng file csv</DialogTitle>

      <DialogContent>
        <WrappedDragDropFile
          form={form}
          name="file"
          fileAccpetType={fileAccpetType}
        />
      </DialogContent>

      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" variant="outlined" onClick={onClose} />
        <CustomButton label="Upload" onClick={handleSubmit} />
      </DialogActions>
    </Dialog>
  );
};

export default ImportFileDialog;
