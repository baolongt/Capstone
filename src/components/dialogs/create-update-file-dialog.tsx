import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useCreateFile, useUpdateFile } from '@/apis';
import {
  CustomButton,
  FieldTitle,
  InputField,
  MultilineTextField,
  SelectField
} from '@/components/common';
import { languageOptions, statusOptions } from '@/constants';
import { file } from '@/models';
import { UpdatePayload } from '@/models/file';

import { createUpdateFileSchema } from './validations';

export interface CreateUpdateFileDialogProps {
  mode?: 'create' | 'update';
  data?: file.File;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateUpdateFileDialog = (props: CreateUpdateFileDialogProps) => {
  const { isOpen, onClose, mode = 'create', data } = props;
  const form = useForm({
    defaultValues: {
      title: '',
      fileNotation: '',
      language: '',
      description: '',
      status: ''
    },
    resolver: yupResolver(createUpdateFileSchema)
  });
  const { handleSubmit, reset } = form;
  const { mutate: createFileMutate } = useCreateFile({
    onSuccess: () => {
      toast.success('Thêm sổ văn bản thành công');
      handleClose();
    },
    onError: () => {
      toast.error('Thêm sổ văn bản thất bại');
    }
  });
  const { mutate: updateFileMutate } = useUpdateFile({
    onSuccess: () => {
      toast.success('Cập nhât sổ văn bản thành công');
      handleClose();
    },
    onError: () => {
      toast.error('Cập nhật sổ văn bản thất bại');
    }
  });
  const submitForm = () => {
    const body = form.getValues();
    if (data?.id) {
      console.log('cập nhật', data.id, body);
      return updateFileMutate({ id: data?.id, payload: body as UpdatePayload });
    }
    return createFileMutate(body as file.CreatePayload);
  };
  const handleClose = () => {
    onClose();
    form.reset();
  };
  useEffect(() => {
    reset({
      title: data?.title ?? '',
      fileNotation: data?.fileNotation ?? '',
      status: data?.status ?? '',
      language: data?.language ?? 'vi',
      description: data?.description ?? ''
    });
  }, [data]);
  return (
    <Dialog
      open={isOpen}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: { lg: '500px', md: '500px', xs: '75vw' }
        }
      }}
      onClose={handleClose}
    >
      <DialogTitle fontWeight={600}>
        {mode === 'create' ? 'Thêm mới' : 'Cập nhật'} sổ văn bản
      </DialogTitle>

      <DialogContent>
        <Stack
          component="form"
          gap={2}
          id="create-update-file-form"
          onSubmit={handleSubmit(submitForm)}
        >
          <Box component="div">
            <FieldTitle title="Tiêu đề" isRequired={true} />
            <InputField
              form={form}
              placeholder="Nhập tiêu đề..."
              name="title"
              label=""
            />
          </Box>
          <Box component="div">
            <FieldTitle title="Số kí hiệu văn bản" isRequired={true} />
            <InputField
              form={form}
              placeholder="Nhập số hiệu văn bản..."
              name="fileNotation"
              label=""
            />
          </Box>
          <Box component="div" mt={2} width={'50%'}>
            <FieldTitle title="Ngôn ngữ" />
            <SelectField
              form={form}
              name="language"
              placeholder="Chọn ngôn ngữ"
              data={languageOptions}
            />
          </Box>
          <Box component="div">
            <FieldTitle title="Ghi chú " />
            <MultilineTextField
              form={form}
              name="description"
              placeholder="Nhập ghi chú..."
              minRows={3}
            />
          </Box>
          {mode === 'update' && (
            <Box component="div" width={'50%'}>
              <FieldTitle title="Trạng thái" />
              <SelectField
                form={form}
                name="status"
                placeholder=""
                data={statusOptions}
              />
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton
          label={mode === 'create' ? 'Thêm mới' : 'Cập nhật'}
          type="submit"
          form="create-update-file-form"
        />
      </DialogActions>
    </Dialog>
  );
};

export default CreateUpdateFileDialog;
