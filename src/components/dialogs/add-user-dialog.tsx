import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Stack, Typography } from '@mui/material';
import CustomButton from '../common/button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from '../common/form-control/input-field';
import { SelectField } from '../common/form-control/select-field';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, updateUser } from '../../api/admin';
import { CreateUserPayload, UpdateUserPayload } from '../../models/user';
import { toast } from 'react-toastify';
import { ToastMessage } from '../toast';
import React, { useEffect } from 'react';
import { jobPositionOptions, roleOptions } from '../../models/enums';

interface AddUserDialogProps {
  mode: 'update' | 'create';
  userProfile?: UpdateUserPayload;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

interface UpdatePayLoad {
  id: number;
  body: UpdateUserPayload;
}

export default function AddUserDialog(props: AddUserDialogProps) {
  const { isOpen, onClose, mode, userProfile } = props;
  const queryClient = useQueryClient();
  const schema = yup.object({
    name: yup.string().required(`Tên người dùng là bắt buộc`),
    password: yup.string().required(`Mật khẩu là bắt buộc`),
    email: yup.string().required(`Email là bắt buộc`),
    citizenIdentification: yup.string().required(`CCCD/CMND là bắt buộc`),
    roleID: yup.string().required(`Vai trò là bắt buộc`),
    jobPositionID: yup.string().required(`Chức vụ là bắt buộc`)
  });

  const form = useForm({
    defaultValues: {
      name: '',
      password: '',
      email: '',
      citizenIdentification: '',
      roleID: 1,
      jobPositionID: 1
    },
    resolver: yupResolver(schema)
  });

  const { handleSubmit, setValue } = form;

  const { mutate: createUserMutation /*, isLoading: isCreateLoading*/ } =
    useMutation({
      mutationFn: (body: CreateUserPayload) => createUser(body),
      onSuccess: () => {
        toast.success(<ToastMessage message={'Thêm người dùng thành công'} />);
        queryClient.invalidateQueries({ queryKey: ['getAllUsers'] });
      },
      onError: () => {
        toast.error(<ToastMessage message={'Thêm người dùng thất bại'} />);
      }
    });

  const { mutate: updateUserMutation /*, isLoading: isUpdateLoading */ } =
    useMutation({
      mutationFn: (payload: UpdatePayLoad) =>
        updateUser(payload.id, payload.body),
      onSuccess: () => {
        toast.success(
          <ToastMessage message={'Cập nhật người dùng thành công'} />
        );
        queryClient.invalidateQueries({ queryKey: ['getAllUsers'] });
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
      name: form.getValues().name,
      password: form.getValues().password,
      email: form.getValues().email,
      citizenIdentification: form.getValues().citizenIdentification,
      roleID: form.getValues().roleID,
      jobPositionID: form.getValues().jobPositionID
    };
    if (mode === 'create') {
      createUserMutation(body);
    } else {
      updateUserMutation({
        id: userProfile?.id!,
        body: body
      });
    }
    handleClose();
  };

  useEffect(() => {
    if (userProfile) {
      setValue('name', userProfile.name || '');
      setValue('password', userProfile.password || '');
      setValue('email', userProfile.email || '');
      setValue(
        'citizenIdentification',
        userProfile.citizenIdentification || ''
      );
      setValue('roleID', userProfile.roleID || 1);
      setValue('jobPositionID', userProfile.jobPositionID || 1);
    }
  }, [userProfile]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: { lg: '600px', md: '600px', xs: '75vw' }
        }
      }}
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
                data={roleOptions}
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
                data={jobPositionOptions}
              />
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" onClick={onClose} variant="outlined" />
        <CustomButton label="Thêm" type="submit" form="add-user-form" />
      </DialogActions>
    </Dialog>
  );
}
