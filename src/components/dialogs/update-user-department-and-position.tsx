import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { useListDepartments } from '@/apis';
import { CustomButton, FieldTitle, SelectField } from '@/components/common';
import { role, user } from '@/models';

type UserUpdateProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: {
    userId: number;
    jobPositionId: string;
    departmentId: string;
  };
  onSubmit: (data: {
    userId: number;
    jobPositionId: string;
    departmentId: string;
  }) => void;
};

type UserUpdateForm = {
  jobPositionId: string;
  departmentId: string;
};

export const UserUpdateDepartmentAndPositionDialog = ({
  isOpen,
  onClose,
  defaultValues,
  onSubmit
}: UserUpdateProps) => {
  const form = useForm<UserUpdateForm>();
  const { handleSubmit, reset } = form;

  const handleFormSubmit = (data: UserUpdateForm) => {
    onSubmit({
      userId: defaultValues?.userId ?? -1,
      jobPositionId: data.jobPositionId,
      departmentId: data.departmentId
    });
    onClose();
  };

  const handleDialogClose = () => {
    reset();
    onClose();
  };

  const { data: depaResponse } = useListDepartments({
    queryParams: {
      page: 1,
      size: 10_000
    }
  });

  return (
    <Dialog open={isOpen} onClose={handleDialogClose}>
      <DialogTitle>Cập nhật thông tin người dùng</DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          gap={2}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Box>
            <FieldTitle title="Chức vụ" />
            <SelectField
              name="jobPositionId"
              label="Chọn chức vụ"
              form={form}
              defaultValue={defaultValues?.jobPositionId ?? 1}
              data={role.jobPositionOptions}
            />
          </Box>
          <Box>
            <FieldTitle title="Phòng ban" />
            <SelectField
              form={form}
              name="departmentId"
              label="Chọn phòng ban"
              defaultValue={defaultValues?.departmentId ?? 1}
              data={
                depaResponse?.data.map((department) => {
                  return {
                    title: department.name,
                    value: department.id
                  };
                }) ?? []
              }
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <CustomButton label="Hủy bỏ" onClick={handleDialogClose} />
        <CustomButton label="Cập nhật" type="submit" form="user-update-form" />
      </DialogActions>
    </Dialog>
  );
};
