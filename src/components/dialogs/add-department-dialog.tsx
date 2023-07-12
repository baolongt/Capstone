import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useCreateDepartment } from '../../apis/department';
import { SelectOption } from '../../types';
import { CustomButton } from '../common';
import { InputField } from '../common/form-control/input-field';
import { SelectField } from '../common/form-control/select-field';
import { ToastMessage } from '../toast';
import { addDepartmentSchema } from './validations';

interface AddDepartmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  usersData: SelectOption[];
}

const AddDepartmentDialog: React.FC<AddDepartmentDialogProps> = ({
  isOpen,
  onClose,
  usersData
}) => {
  const form = useForm({
    defaultValues: {
      name: '',
      departmentLeaderID: null
    },
    resolver: yupResolver(addDepartmentSchema)
  });

  const { handleSubmit } = form;

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
      name: string;
      departmentLeaderID: number;
    } = {
      name: form.getValues().name,
      departmentLeaderID: form.getValues().departmentLeaderID
    };

    createDepartmentMutation(body);
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
        <CustomButton label="Hủy bỏ" variant="outlined" onClick={onClose} />
        <CustomButton label="Thêm" type="submit" form="add-deartment-form" />
      </DialogActions>
    </Dialog>
  );
};

export default AddDepartmentDialog;
