import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { Accept } from 'react-dropzone';
import { Resolver, useForm, UseFormReturn } from 'react-hook-form';

import { template, UploadFile } from '@/models';

import { CustomButton, FieldTitle, InputField } from '../common';
import { WrappedDragDropFile } from '../common/form-control/drag-drop-file';
import { createTemplateSchema } from './validations';

const fileAccpetType: Accept = {
  'text/csv': ['.csv']
};

export interface CreateTemplateDialogProps {
  mode?: 'create';
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

type TemplateCreate = {
  name: string;
  file: UploadFile | undefined;
};

const CreateTemplateDialog: React.FC<CreateTemplateDialogProps> = ({
  isOpen,
  onClose,
  mode = 'create'
}) => {
  const form = useForm<TemplateCreate>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(createTemplateSchema) as unknown as Resolver<
      TemplateCreate,
      any
    >
  });

  const handleSubmit = () => {
    console.log('values', form.getValues());
    // const { file } = form.getValues();
    // if (file && file.fileObj) {
    //   onSubmit(file.fileObj);
    // }
  };

  return (
    <Dialog
      open={isOpen}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: { lg: '600px', md: '600px', xs: '75vw' }
        }
      }}
      onClose={onClose}
    >
      <DialogTitle fontWeight={600}>
        {mode === 'create' ? 'Thêm mới' : 'Cập nhật'} văn bản mẫu
      </DialogTitle>

      <DialogContent>
        <Box component="div" sx={{ width: '100%', mb: 3 }}>
          <FieldTitle
            title="Tên văn bản mẫu"
            isRequired={true}
            sx={{ fontWeight: 400 }}
          />
          <InputField form={form} name="name" label="" />
        </Box>
        <Box component="div" sx={{ width: '100%', mb: 3 }}>
          <FieldTitle
            title="Văn bản mẫu"
            isRequired={true}
            sx={{ fontWeight: 400 }}
          />
          <WrappedDragDropFile
            form={form}
            name="file"
            fileAccpetType={fileAccpetType}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" variant="outlined" onClick={onClose} />
        <CustomButton label="Tạo" onClick={handleSubmit} />
      </DialogActions>
    </Dialog>
  );
};

export default CreateTemplateDialog;
