import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Typography } from '@mui/material';
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
  const { mutate, isLoading, isSuccess, isError } = useLogin({
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
    <Box sx={{ width: '300px', mx: 'auto', mt: 15 }}>
      <Grid
        container
        spacing={2}
        component="form"
        id="create-document-form"
        onSubmit={handleSubmit}
      >
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold">
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
            Email
          </Typography>
          <InputField label="" form={form} name="email" />
        </Grid>
        <Grid item xs={12}>
          <Typography style={{ marginBottom: '5px' }} fontWeight="bold">
            Password
          </Typography>
          <InputField type="password" label="" form={form} name="password" />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={false}
          >
            Login
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
