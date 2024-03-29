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

import { useCreateUser, useUpdateUser } from '@/apis';
import {
  CustomButton,
  FieldTitle,
  InputField,
  SelectField
} from '@/components/common';
import { role, user } from '@/models';
import { Role } from '@/models/user';
import { Nullable } from '@/types';

import { addUserSchema } from './validations';

export type AddUserDialogProps = {
  mode: 'update' | 'create';
  userProfile?: Nullable<user.UpdatePayload>;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};
export const AddUserDialog: React.FC<AddUserDialogProps> = ({
  isOpen,
  onClose,
  mode,
  userProfile
}) => {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      citizenIdentification: '',
      roleID: 1
    },
    resolver: yupResolver(addUserSchema)
  });

  const { handleSubmit, getValues, reset } = form;

  // Create Part
  const { mutate: createUserMutate } = useCreateUser({
    onSuccess: () => {
      toast.success('Thêm nhân viên thành công');
      handleClose();
    },
    onError: () => {
      toast.error('Thêm nhân viên thất bại');
    }
  });

  // Update part
  const { mutate: updateUserMutate } = useUpdateUser({
    onSuccess: () => {
      toast.success('Cập nhật nhân viên thành công');
      handleClose();
    },
    onError: () => {
      toast.error('Cập nhật nhân viên thất bại');
    }
  });

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const onSubmit = () => {
    const body: any = {
      ...getValues()
    };
    if (mode === 'create') {
      createUserMutate(body);
    } else {
      if (userProfile?.id) {
        updateUserMutate({ id: userProfile.id, payload: body });
      }
    }
  };

  useEffect(() => {
    reset({
      name: userProfile?.name ?? '',
      email: userProfile?.email ?? '',
      citizenIdentification: userProfile?.citizenIdentification ?? '',
      roleID: userProfile?.roleID ?? Role.OFFICER
    });
  }, [reset, userProfile]);

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
        {mode === 'create' ? 'Thêm nhân viên mới' : 'Cập nhật thông tin'}
      </DialogTitle>

      <DialogContent>
        <Stack
          component="form"
          id="add-user-form"
          gap={1}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box component="div">
            <FieldTitle isRequired title="Tên nhân viên" />
            <InputField
              form={form}
              placeholder="Nhập tên người dùng"
              name="name"
              label=""
            />
          </Box>
          <Box component="div" mt={2}>
            <FieldTitle isRequired title="Email" />
            <InputField
              form={form}
              placeholder="Nhập email"
              name="email"
              label=""
            />
          </Box>
          <Box component="div" mt={2}>
            <FieldTitle isRequired title="CCCD/CMND" />
            <InputField
              form={form}
              placeholder="Nhập CCCD/CMND"
              name="citizenIdentification"
              label=""
            />
          </Box>
          {mode === 'create' && (
            <Stack direction={'row'} gap={3}>
              <Box>
                <FieldTitle isRequired title="Vai trò" />
                <SelectField
                  form={form}
                  name="roleID"
                  placeholder="Chọn vai trò"
                  data={role.roleOptions}
                />
              </Box>
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" variant="outlined" onClick={onClose} />
        <CustomButton
          label={mode === 'create' ? 'Thêm' : 'Cập nhật'}
          type="submit"
          form="add-user-form"
        />
      </DialogActions>
    </Dialog>
  );
};
