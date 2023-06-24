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
import { SelectOption, jobPositionOptions, roleOptions } from '../../models/enums';
import { createDepartment } from '../../api/department';
import { createDepartmentPayload } from '../../models/department';

interface AddDepartmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  usersData: SelectOption[];
}

export default function AddDepartmentDialog(props: AddDepartmentDialogProps) {
  const { isOpen, onClose, usersData} = props;
  const queryClient = useQueryClient();
  const schema = yup.object({
    name: yup.string().required(`Tên phòng ban là bắt buộc`),
    departmentLeaderID: yup.number().required(`Trưởng phòng là bắt buộc`)
  });

  const form = useForm({
    defaultValues: {
      name: '',
      departmentLeaderID: null,
    },
    resolver: yupResolver(schema)
  });
  
  const { handleSubmit, setValue } = form;

  const {mutate: createDepartmentMutation, isLoading: isCreateLoading} = useMutation({
    mutationFn: (body: createDepartmentPayload) => createDepartment(body),
    onSuccess: () => {
      toast.success(<ToastMessage message={'Thêm phòng ban thành công'} />);
      queryClient.invalidateQueries({ queryKey: ['getAllDepartments'] });
      handleClose()
    },
    onError: () => {
      toast.error(<ToastMessage message={'Thêm người dùng thất bại'} />);
    }
  });


  const handleClose = () =>{
    onClose();
    form.reset();
  }

  const onSubmit = () => {
    const body: any = {
      name: form.getValues().name,
      departmentLeaderID: form.getValues().departmentLeaderID
    };

    createDepartmentMutation(body);
    handleClose()
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
      <DialogTitle fontWeight={600}>Thêm phòng ban</DialogTitle>

      <DialogContent>
        <Stack
          component="form"
          id="add-department-form"
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
              placeholder="Nhập tên phòng ban"
              name="name"
              label=""
            />
          </Box>

          <Stack direction={'row'} gap={3}>
     

            <Box mt={2}>
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
                data={[usersData]}
              />
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" onClick={onClose} variant="outlined" />
        <CustomButton label="Thêm" type="submit" form="add-deartment-form" />
      </DialogActions>
    </Dialog>
  );
}
