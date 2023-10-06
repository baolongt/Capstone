import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  useGetUserById,
  useListDepartments,
  useUpdateUserDepartment
} from '@/apis';
import {
  CustomButton,
  FieldTitle,
  Loading,
  SelectField
} from '@/components/common';
import { role } from '@/models';

type UserUpdateProps = {
  isOpen: boolean;
  onClose: () => void;
  userId?: number | null;
  onSubmit: (data: {
    userId: number;
    jobPositionId: number;
    departmentId: number;
  }) => void;
};

type UserUpdateForm = {
  jobPositionId: number;
  departmentId: number;
};

export const UserUpdateDepartmentAndPositionDialog = ({
  isOpen,
  onClose,
  userId
}: UserUpdateProps) => {
  const form = useForm<UserUpdateForm>({
    defaultValues: {
      jobPositionId: -1,
      departmentId: -1
    }
  });
  const {
    reset,
    formState: { isDirty },
    getValues
  } = form;

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
  const { data: user, isLoading } = useGetUserById(userId);

  const { mutate: updatePositionAndDepartment } = useUpdateUserDepartment({
    onSuccess: () => {
      toast.success('Cập nhật nhân viên thành công');
    },
    onError: () => {
      toast.error('Cập nhật nhân viên thất bại');
    }
  });

  const handleFormSubmit = () => {
    updatePositionAndDepartment({
      userId: userId || -1,
      ...getValues()
    });
    onClose();
  };

  useEffect(() => {
    if (user) {
      form.reset(
        {
          jobPositionId: user.jobPositionID ?? -1,
          departmentId: user.departmentId ?? -1
        },
        { keepDirty: false }
      );
    }
  }, [form, user]);

  return (
    <Dialog open={isOpen} onClose={handleDialogClose}>
      <DialogTitle fontWeight={600}>Cập nhật thông tin người dùng</DialogTitle>
      <DialogContent>
        <Stack component="form" gap={2}>
          {isLoading ? (
            <Loading sx={{ height: '100%' }} />
          ) : (
            <>
              <Box>
                <FieldTitle
                  sx={{
                    fontWeight: 'bold'
                  }}
                  title="Chức vụ"
                />
                <SelectField
                  name="jobPositionId"
                  form={form}
                  data={role.jobPositionOptions}
                />
              </Box>
              <Box>
                <FieldTitle
                  sx={{
                    fontWeight: 'bold'
                  }}
                  title="Phòng ban"
                />
                <SelectField
                  form={form}
                  name="departmentId"
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
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <CustomButton label="Hủy bỏ" onClick={handleDialogClose} />
        <CustomButton
          disabled={!isDirty}
          label="Cập nhật"
          form="user-update-form"
          onClick={() => handleFormSubmit()}
        />
      </DialogActions>
    </Dialog>
  );
};
