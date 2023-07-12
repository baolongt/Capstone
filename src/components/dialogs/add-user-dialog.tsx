import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Nullable } from '@/types';

import { useCreateUser, useUpdateUser } from '../../apis';
import { role, user } from '../../models';
import { CustomButton, InputField, SelectField } from '../common';
import { ToastMessage } from '../toast';
import { addUserSchema } from './validations';

type AddUserDialogProps = {
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
      toast.success(<ToastMessage message={'Thêm người dùng thành công'} />);
    },
    onError: () => {
      toast.error(<ToastMessage message={'Thêm người dùng thất bại'} />);
    }
  });

  // Update part
  const { mutate: updateUserMutate } = useUpdateUser({
    onSuccess: () => {
      toast.success(
        <ToastMessage message={'Cập nhật người dùng thành công'} />
      );
    },
    onError: () => {
      toast.error(<ToastMessage message={'Cập nhật người dùng thất bại'} />);
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
  }, [userProfile]);

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
          <Box>
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
          <Box mt={2}>
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
          <Box mt={2}>
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
          <Box mt={2}>
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
            <Box mt={2}>
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

            <Box mt={2}>
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

export default AddUserDialog;
