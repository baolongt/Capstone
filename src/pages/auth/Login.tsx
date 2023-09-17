import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useLogin } from '@/apis/auth/login';
import { InputField } from '@/components/common';
import useAuth from '@/hooks/useAuth';
import { validation } from '@/models';

const Login = () => {
  const { setAuthState } = useAuth();
  const navigate = useNavigate();
  const { mutate } = useLogin({
    onSuccess: (data) => {
      setAuthState({
        isAuthenticated: true,
        user: data
      });
      navigate('/');
    },
    onError: () => {
      toast.error('Sai tài khoản hoặc mật khẩu');
    }
  });
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(validation.auth.LoginPayloadSchema)
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(form.getValues());
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ height: '100vh', width: '70%' }}>
        <img
          src="/src/assets/login_page.jpeg"
          alt="logo"
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>
      <Box
        sx={{ width: '400px', mx: 'auto', mt: 20 }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box sx={{ mb: 7 }}>
          <Typography variant="h5" fontWeight="bold">
            Hệ thống quản lý văn bản
          </Typography>
        </Box>
        <Typography fontWeight="bold">Email</Typography>
        <InputField sx={{ mb: 2 }} label="" form={form} name="email" />
        <Typography fontWeight="bold">Password</Typography>
        <InputField type="password" label="" form={form} name="password" />
        <LoadingButton
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 3 }}
          loading={false}
        >
          Login
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Login;
