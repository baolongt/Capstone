import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { useChangePassword } from '@/apis/profile/change-password';
import { FieldTitle, InputField } from '@/components/common';
import { DEFAULT_PAGE_WIDTH } from '@/constants';

const ChangePasswordPage = () => {
  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    resolver: yupResolver(
      yup.object().shape({
        oldPassword: yup.string().required('Vui lòng nhập mật khẩu cũ'),
        newPassword: yup.string().required('Vui lòng nhập mật khẩu mới'),
        confirmNewPassword: yup
          .string()
          .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp')
          .required('Vui lòng nhập lại mật khẩu mới')
      })
    )
  });

  const { mutate: changePassword, isLoading } = useChangePassword({
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công');
    },
    onError: () => {
      toast.error('Đổi mật khẩu thất bại');
    }
  });
  const { handleSubmit } = form;
  const onSubmit = (data: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    });
  };

  return (
    <Box
      sx={{
        width: DEFAULT_PAGE_WIDTH,
        px: 6,
        pt: 4,
        pb: 5,
        borderRadius: 4,
        backgroundColor: '#fff',
        mx: 'auto'
      }}
      component={Paper}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 6 }}
          mt={3}
        >
          <Grid item xs={12} gap={1}>
            <FieldTitle
              isRequired={true}
              title="Mật khẩu cũ"
              sx={{ fontWeight: 'bold' }}
            />
            <InputField
              form={form}
              name="oldPassword"
              type="password"
              label=""
            />
          </Grid>
          <Grid item xs={12} gap={1}>
            <FieldTitle
              isRequired={true}
              title="Mật khẩu mới"
              sx={{ fontWeight: 'bold' }}
            />
            <InputField
              form={form}
              name="newPassword"
              type="password"
              label=""
            />
          </Grid>
          <Grid item xs={12} gap={1}>
            <FieldTitle
              isRequired={true}
              title="Nhập lại mật khẩu mới"
              sx={{ fontWeight: 'bold' }}
            />
            <InputField
              form={form}
              name="confirmNewPassword"
              type="password"
              label=""
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default ChangePasswordPage;
