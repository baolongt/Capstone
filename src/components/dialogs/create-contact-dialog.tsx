import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useCreateContact, useUpdateContact } from '@/apis/contact';
import { CustomButton, FieldTitle, InputField } from '@/components/common';
import { contact } from '@/models';
import { UpdatePayload } from '@/models/contact';

import { createContactSchema } from './validations';

export interface AddContactDialogProps {
  mode?: 'create' | 'update';
  data?: contact.Contact;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateContactDialog: React.FC<AddContactDialogProps> = ({
  isOpen,
  onClose,
  mode = 'create',
  data
}) => {
  const form = useForm({
    defaultValues: {
      name: '',
      organCode: '',
      email: '',
      phone: ''
    },
    resolver: yupResolver(createContactSchema)
  });
  //   const [queryParams, setQueryParams] = React.useState<BaseTableQueryParams>({
  //     page: 1,
  //     size: 10
  //   });
  const { handleSubmit, reset } = form;
  const { mutate: createContactMutate } = useCreateContact({
    onSuccess: () => {
      toast.success('Thêm đơn vị thành công');
      handleClose();
    },
    onError: () => {
      toast.error('Thêm đơn vị thất bại');
    }
  });
  const { mutate: updateContactMutate } = useUpdateContact({
    onSuccess: () => {
      toast.success('Cập nhât đơn vị thành công');
      handleClose();
    },
    onError: () => {
      toast.error('Cập nhật đơn vị thất bại');
    }
  });

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const onSubmit = () => {
    const body = form.getValues();
    if (data?.id) {
      return updateContactMutate({
        id: data?.id,
        payload: body as UpdatePayload
      });
    }
    return createContactMutate(body as contact.CreatePayload);
  };
  useEffect(() => {
    reset({
      name: data?.name ?? '',
      organCode: data?.organCode ?? '',
      email: data?.email ?? '',
      phone: data?.phone ?? ''
    });
  }, [data]);

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
        {mode === 'create' ? 'Thêm mới' : 'Cập nhật'} đơn vị
      </DialogTitle>

      <DialogContent>
        <Stack
          component="form"
          id="add-contact-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box component="div">
            <FieldTitle title="Tên đơn vị" isRequired={true} />
            <InputField
              form={form}
              placeholder="Nhập tên đơn vị"
              name="name"
              label=""
            />
          </Box>
          <Box component="div">
            <FieldTitle title="Mã đơn vị" isRequired={true} />
            <InputField
              form={form}
              placeholder="Nhập mã đơn vị"
              name="organCode"
              label=""
            />
          </Box>
          <Box component="div">
            <FieldTitle title="Email" isRequired={true} />
            <InputField
              form={form}
              placeholder="Nhập email"
              name="email"
              label=""
            />
          </Box>
          <Box component="div">
            <FieldTitle title="Số điện thoại" isRequired={true} />
            <InputField
              form={form}
              placeholder="Nhập số điện thoại"
              name="phone"
              label=""
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" variant="outlined" onClick={onClose} />
        <CustomButton
          label={mode === 'create' ? 'Thêm mới' : 'Cập nhật'}
          type="submit"
          form="add-contact-form"
        />
      </DialogActions>
    </Dialog>
  );
};
