import { Avatar, Box, Grid, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FieldTitle, InputField } from '@/components/common';
import { DEFAULT_PAGE_WIDTH } from '@/constants';
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
  });
  const { reset } = form;

  useEffect(() => {
    if (authState.user) {
      reset({
        name: authState.user.name,
        email: authState.user.email,
        citizenIdentification: authState.user.citizenIdentification,
        roleName: authState.user.role.name,
        jobPositionName: authState.user.jobPosition ?? '',
        departmentName: authState.user.department.name
      });
    }
  }, [authState.user, reset]);
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
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
        <Avatar
          alt="avatar"
          src="https://www.mgp.net.au/wp-content/uploads/2023/05/150-1503945_transparent-user-png-default-user-image-png-png.png"
          sx={{ width: 86, height: 86 }}
        />
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
  );
};

export default Profile;
