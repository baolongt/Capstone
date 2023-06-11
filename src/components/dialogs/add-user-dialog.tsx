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
import { createUser } from '../../api/admin';
import { CreateUserPayload } from '../../models/user';
import { toast } from 'react-toastify';
import { ToastMessage } from '../toast';
import React from 'react';

interface AddUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const roleOptions = [
  {
    title: 'Quản trị viên',
    value: 2
  },
  {
    title: 'Công chức',
    value: 1
  }
];
const jobPositionOptions = [
  {
    title: 'Cán bộ',
    value: 1
  },
  {
    title: 'Phó trưởng phòng',
    value: 2
  },
  {
    title: 'Trưởng phòng',
    value: 3
  },
  {
    title: 'Phó vụ trưởng',
    value: 4
  },
  {
    title: 'Phó tổng cục trưởng',
    value: 5
  },
  {
    title: 'Tổng cục trưởng',
    value: 6
  },
  {
    title: 'Lãnh đạo cấp cao',
    value: 7
  }
];

export default function AddUserDialog(props: AddUserDialogProps) {
  // eslint-disable-next-line no-unused-vars
  const { isOpen, onClose, onConfirm } = props;
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
      jobPositionID: 0
    },
    resolver: yupResolver(schema)
  });
  const {
    handleSubmit
    // formState: { isValid, isSubmitted }
  } = form;

  const createUserMutation = useMutation({
    mutationFn: (body: CreateUserPayload) => createUser(body),
    onSuccess: () => {
      toast.success(<ToastMessage message={'Thêm người dùng thành công'} />);
      queryClient.invalidateQueries({ queryKey: ['getAllUsers'] });
    },
    onError: () => {
      toast.error(<ToastMessage message={'Thêm người dùng thất bại'} />);
    }
  });

  const onSubmit = () => {
    const body: any = {
      name: form.getValues().name,
      password: form.getValues().password,
      email: form.getValues().email,
      citizenIdentification: form.getValues().citizenIdentification,
      roleID: form.getValues().roleID,
      jobPositionID: form.getValues().jobPositionID
    };
    createUserMutation.mutate(body);
    form.reset();
    onClose();
  };

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
      <DialogTitle fontWeight={600}>Thêm người dùng mới</DialogTitle>

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
