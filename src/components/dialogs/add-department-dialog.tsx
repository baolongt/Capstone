import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Stack, Typography } from '@mui/material';
import {CustomButton} from '../common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from '../common/form-control/input-field';
import { SelectField } from '../common/form-control/select-field';
import { toast } from 'react-toastify';
import { ToastMessage } from '../toast';
import React from 'react';
import { SelectOption } from '../../types';
import { addDepartmentSchema } from './validations';
import { useCreateDepartment } from '../../apis/department';
import { useListUsers } from '../../apis';
import { User } from '../../models/user';

interface AddDepartmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDepartmentDialog: React.FC<AddDepartmentDialogProps> = ({isOpen, onClose}) => {
  const form = useForm({
    defaultValues: {
      name: '',
      departmentLeaderID: null,
    },
    resolver: yupResolver(addDepartmentSchema)
  });
  
  const { handleSubmit } = form;
  const {data: users} = useListUsers();
  const {mutate: createDepartmentMutation} = useCreateDepartment({
    onSuccess: () => {
      toast.success(<ToastMessage message={'Thêm phòng ban thành công'} />);
      handleClose();
    },
    onError: () => {
      toast.error(<ToastMessage message={'Thêm người dùng thất bại'} />);
    }
  })

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
                data={
                  users?.data.map((user: User) => {
                    return { title: user.name, value: user.id };
                  }) ?? []
                }
              />
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Hủy bỏ" onClick={onClose} variant="outlined" />
        <CustomButton label="Thêm" type="submit" form="add-department-form" />
      </DialogActions>
    </Dialog>
  );
}

export default AddDepartmentDialog;