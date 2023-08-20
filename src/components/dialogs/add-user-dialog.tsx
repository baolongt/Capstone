import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useCreateUser, useUpdateUser } from '@/apis';
import { CustomButton, InputField, SelectField } from '@/components/common';
import { role, user } from '@/models';
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
      password: '',
      email: '',
      citizenIdentification: '',
      roleID: 1,
      jobPositionID: 1
    },
    resolver: yupResolver(addUserSchema)
  });

  const { handleSubmit, getValues, reset } = form;

  // Create Part
  const { mutate: createUserMutate } = useCreateUser({
    onSuccess: () => {
      toast.success('Thêm người dùng thành công');
    },
    onError: () => {
      toast.error('Thêm người dùng thất bại');
    }
  });

  // Update part
  const { mutate: updateUserMutate } = useUpdateUser({
    onSuccess: () => {
      toast.success('Cập nhật người dùng thành công');
    },
    onError: () => {
      toast.error('Cập nhật người dùng thất bại');
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
        updateUserMutate({ id: userProfile?.id, payload: body });
      }
    }
    handleClose();
  };

  useEffect(() => {
    reset({
      name: userProfile?.name ?? '',
      password: userProfile?.password ?? '',
      email: userProfile?.email ?? '',
      citizenIdentification: userProfile?.citizenIdentification ?? '',
      roleID: userProfile?.roleID ?? 1,
      jobPositionID: userProfile?.jobPositionID ?? 1
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
        {mode === 'create' ? 'Thêm người dùng mới' : 'Cập nhật thông tin'}
      </DialogTitle>

      <DialogContent>
        <Stack
          component="form"
          id="add-user-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box component="div">
            <Typography>
              Tên người dùng
              <Box component="span" color="error.main">
                *
              </Box>
            </Typography>

            <InputField
              form={form}
              placeholder="Nhập tên người dùng"
              name="name"
              label=""
            />
          </Box>
          <Box component="div" mt={2}>
            <Typography>
              Mật khẩu
              <Box component="span" color="error.main">
                *
              </Box>
            </Typography>

            <InputField
              form={form}
              placeholder="Nhập mật khẩu"
              name="password"
              label=""
            />
          </Box>
          <Box component="div" mt={2}>
            <Typography>
              Email
              <Box component="span" color="error.main">
                *
              </Box>
            </Typography>
            <InputField
              form={form}
              placeholder="Nhập email"
              name="email"
              label=""
            />
          </Box>
          <Box component="div" mt={2}>
            <Typography>
              CCCD/CMND
              <Box component="span" color="error.main">
                *
              </Box>
            </Typography>
            <InputField
              form={form}
              placeholder="Nhập CCCD/CMND"
              name="citizenIdentification"
              label=""
            />
          </Box>

          <Stack direction={'row'} gap={3}>
            <Box component="div" mt={2}>
              <Typography>
                Vai trò
                <Box component="span" color="error.main">
                  *
                </Box>
              </Typography>

              <SelectField
                form={form}
                name="roleID"
                placeholder="Chọn vai trò"
                data={role.roleOptions}
              />
            </Box>

            <Box component="div" mt={2}>
              <Typography>
                Chức vụ
                <Box component="span" color="error.main">
                  *
                </Box>
              </Typography>
              <SelectField
                form={form}
                name="jobPositionID"
                placeholder="Chọn chức vụ"
                data={role.jobPositionOptions}
              />
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" variant="outlined" onClick={onClose} />
        <CustomButton label="Thêm" type="submit" form="add-user-form" />
      </DialogActions>
    </Dialog>
  );
};
