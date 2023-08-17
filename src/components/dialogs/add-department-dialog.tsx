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
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useListUsers } from '@/apis';
import { useCreateDepartment } from '@/apis/department';
import { CustomButton, InputField, SelectField } from '@/components/common';
import { ToastMessage } from '@/components/toast';
import { User } from '@/models/user';
import { BaseTableQueryParams } from '@/types';

import { addDepartmentSchema } from './validations';

export interface AddDepartmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddDepartmentDialog: React.FC<AddDepartmentDialogProps> = ({
  isOpen,
  onClose
}) => {
  const form = useForm({
    defaultValues: {
      name: '',
      departmentLeaderID: 0
    },
    resolver: yupResolver(addDepartmentSchema)
  });
  const [queryParams, setQueryParams] = React.useState<BaseTableQueryParams>({
    page: 1,
    size: 10
  });
  const { handleSubmit } = form;
  const { data: response } = useListUsers({
    queryParams: { page: 1, size: 1000, search: '' }
  });
  const { mutate: createDepartmentMutation } = useCreateDepartment({
    onSuccess: () => {
      toast.success(<ToastMessage message={'Thêm phòng ban thành công'} />);
      handleClose();
    },
    onError: () => {
      toast.error(<ToastMessage message={'Thêm người dùng thất bại'} />);
    }
  });

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const onSubmit = () => {
    const body: {
      name: string | null;
      departmentLeaderID: number | null;
    } = {
      name: form.getValues().name,
      departmentLeaderID: form.getValues().departmentLeaderID
    };

    if (body.name && body.departmentLeaderID) {
      createDepartmentMutation({
        name: body.name,
        departmentLeaderID: body.departmentLeaderID
      });
    }

    handleClose();
  };

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
      <DialogTitle fontWeight={600}>Thêm phòng ban</DialogTitle>

      <DialogContent>
        <Stack
          component="form"
          id="add-department-form"
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
                form={form}
                name="departmentLeaderID"
                placeholder="Chọn trưởng phòng"
                data={
                  response
                    ? response.data?.map((user: User) => {
                        return { title: user.name, value: user.id };
                      })
                    : []
                }
              />
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" variant="outlined" onClick={onClose} />
        <CustomButton label="Thêm" type="submit" form="add-department-form" />
      </DialogActions>
    </Dialog>
  );
};
