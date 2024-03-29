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
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useListUserNotBelongToAnyDepartment } from '@/apis/admin/user/listUserNotBelongToAnyDepartment';
import { useCreateDepartment, useUpdateDepartment } from '@/apis/department';
import {
  CustomButton,
  InputField,
  Loading,
  SelectField
} from '@/components/common';
import { department } from '@/models';
import { UpdatePayload } from '@/models/department';

import { addDepartmentSchema } from './validations';

export interface AddDepartmentDialogProps {
  mode?: 'create' | 'update';
  data?: department.Department;
  isOpen: boolean;
  onClose: () => void;
}

export const AddDepartmentDialog: React.FC<AddDepartmentDialogProps> = ({
  isOpen,
  onClose,
  mode = 'create',
  data
}) => {
  const form = useForm({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(addDepartmentSchema)
  });
  const { data: users, refetch } = useListUserNotBelongToAnyDepartment(
    data?.id.toString()
  );
  const { handleSubmit, reset, getValues } = form;
  const { mutate: createDepartmentMutate } = useCreateDepartment({
    onSuccess: () => {
      toast.success('Thêm phòng ban thành công');
      handleClose();
    },
    onError: () => {
      toast.error('Thêm phòng ban thất bại');
    }
  });
  const { mutate: updateDepartmentMutate } = useUpdateDepartment({
    onSuccess: () => {
      toast.success('Cập nhât phòng ban thành công');
      handleClose();
    },
    onError: () => {
      toast.error('Cập nhật phòng ban thất bại');
    }
  });
  const [defaultValue, setDefaultValue] = useState<number>(0);

  const handleClose = () => {
    onClose();
    form.reset();
  };

  useEffect(() => {
    console.log('data', data);
    refetch();
    if (data && data.id && mode != 'create') {
      setDefaultValue(data?.departmentLeaderID);
      reset(
        {
          name: getValues().name,
          departmentLeaderID: data.id
        },
        { keepDirty: false }
      );
    }
  }, [data, mode, isOpen]);

  const onSubmit = () => {
    const body = form.getValues();
    if (data?.id) {
      return updateDepartmentMutate({
        id: data?.id,
        payload: body as UpdatePayload
      });
    }
    return createDepartmentMutate(body as department.CreatePayload);
  };
  useEffect(() => {
    reset({
      name: data?.name ?? ''
    });
  }, [data, reset]);

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
        {mode === 'create' ? 'Thêm mới' : 'Cập nhật'} phòng ban
      </DialogTitle>

      <DialogContent>
        <Stack
          component="form"
          id="add-department-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box component="div">
            <Typography>
              Tên phòng ban
              <Box component="span" color="error.main">
                *
              </Box>
            </Typography>

            <InputField
              form={form}
              placeholder="Nhập tên phòng ban"
              name="name"
              label=""
            />
          </Box>

          <Stack direction={'row'} gap={3}>
            <Box component="div" mt={2}>
              <Typography>
                Chọn trưởng phòng
                <Box component="span" color="error.main">
                  *
                </Box>
              </Typography>
              <SelectField
                defaultValue={defaultValue}
                form={form}
                name="departmentLeaderID"
                placeholder="Chọn trưởng phòng"
                data={
                  users?.map((user) => {
                    return { title: user.name, value: user.id };
                  }) ?? []
                }
              />
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" variant="outlined" onClick={onClose} />
        <CustomButton
          label={mode === 'create' ? 'Thêm' : 'Cập nhật'}
          type="submit"
          form="add-department-form"
        />
      </DialogActions>
    </Dialog>
  );
};
