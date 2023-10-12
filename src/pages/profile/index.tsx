import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, colors, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FieldTitle, InputField, SelectField } from '@/components/common';
import useAuth from '@/hooks/useAuth';

const Profile = () => {
  const { authState } = useAuth();
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      citizenIdentification: '',
      roleName: '',
      jobPositionName: '',
      departmentName: ''
    }
    // resolver: yupResolver()
  });
  const { handleSubmit, getValues, reset } = form;

  useEffect(() => {
    reset({
      name: authState.user?.name ?? 'Zoro',
      email: authState.user?.email ?? 'zoroprovip123@gmail.com',
      citizenIdentification:
        authState.user?.citizenIdentification ?? '238940923849',
      roleName: authState.user?.role.name ?? 'Cán bộ',
      jobPositionName: authState.user?.jobPosition ?? 'Cán bộ',
      departmentName: authState.user?.department.name ?? 'Phòng nội vụ'
    });
  }, [reset]);
  return (
    <Box
      sx={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          width: '60%',
          px: 6,
          pt: 4,
          pb: 5,
          borderRadius: 4,
          //border: '1px solid #5c6bc0',
          boxShadow:
            'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
        }}
      >
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Avatar
            alt="avatar"
            src="https://www.mgp.net.au/wp-content/uploads/2023/05/150-1503945_transparent-user-png-default-user-image-png-png.png"
            sx={{ width: 86, height: 86 }}
          />
          <Typography variant="h6">Zoro</Typography>
        </Box>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 6 }}
          mt={3}
        >
          <Grid item xs={6} gap={1}>
            <FieldTitle title="Họ và tên" sx={{ fontWeight: 'bold' }} />
            <InputField
              disabled
              form={form}
              placeholder="Họ và tên"
              name="name"
              label=""
            />
          </Grid>
          <Grid item xs={6} gap={1}>
            <FieldTitle title="Email" sx={{ fontWeight: 'bold' }} />
            <InputField
              disabled
              form={form}
              placeholder="Email"
              name="email"
              label=""
            />
          </Grid>
          <Grid item xs={6} gap={1}>
            <FieldTitle title="CCCD/CMND" sx={{ fontWeight: 'bold' }} />
            <InputField
              disabled
              form={form}
              placeholder="CCCD/CMND"
              name="citizenIdentification"
              label=""
            />
          </Grid>
          <Grid item xs={6} gap={1}>
            <FieldTitle title="Vai trò" sx={{ fontWeight: 'bold' }} />
            <InputField
              disabled
              form={form}
              placeholder="Vai trò"
              name="roleName"
              label=""
            />
          </Grid>
          <Grid item xs={6} gap={1}>
            <FieldTitle title="Vị trí" sx={{ fontWeight: 'bold' }} />
            <InputField
              disabled
              form={form}
              placeholder="Vị trí"
              name="jobPositionName"
              label=""
            />
          </Grid>
          <Grid item xs={6} gap={1}>
            <FieldTitle title="Phòng ban" sx={{ fontWeight: 'bold' }} />
            <InputField
              disabled
              form={form}
              placeholder="Phòng ban"
              name="departmentName"
              label=""
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
