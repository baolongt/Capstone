import { Box } from '@mui/material';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useAddUser, useDeleteUser, useListUsers } from '@/apis';
import { CustomButton, InputSearch, Loading } from '@/components/common';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import {
  AddUserDialog,
  ConfirmDialog,
  ImportFileDialog,
  UserUpdateDepartmentAndPositionDialog
} from '@/components/dialogs';
import theme from '@/components/theme/theme';
import { UserTable } from '@/components/user';
import { DEBOUND_SEARCH_TIME, DEFAULT_PAGE_WIDTH } from '@/constants';
import { user } from '@/models';
import { BaseTableQueryParams } from '@/types';

const UserManagement = () => {
  const [queryParams, setQueryParams] = React.useState<BaseTableQueryParams>({
    page: 1,
    size: 10,
    search: ''
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [mode, setMode] = useState<'update' | 'create'>('create');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isImportFileDialogOpen, setIsImportFileDialogOpen] =
    useState<boolean>(false);
  const [
    isUpdateDepartmentAndPositionDialogOpen,
    setIsUpdateDepartmentAndPositionDialogOpen
  ] = useState<boolean>(false);

  const { data, isLoading } = useListUsers({ queryParams });
  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setQueryParams((prev) => ({ ...prev, search: e.target.value }));
  };
  const debouncedSearch = debounce(handleSearch, DEBOUND_SEARCH_TIME);
  //delete User
  const { mutate: deleteUserMutate } = useDeleteUser({
    onSuccess: () => {
      toast.success('Xóa người dùng thành công');
      handleCloseDeleteDialog();
    },
    onError: () => {
      toast.error('Xóa người dùng thất bại');
    }
  });
  const handleOpenDeleteDialog = (id: number) => {
    setCurrentUserId(id);
    setIsDeleteDialogOpen(true);
  };
  const handleCloseDeleteDialog = () => setIsDeleteDialogOpen(false);
  const handleDeleteUser = () => {
    if (currentUserId) {
      deleteUserMutate?.(currentUserId);
    }
  };
  // Add User by Csv file
  const { mutate } = useAddUser({
    onSuccess: () => {
      toast.success('Nhập file thành công');
      handleCloseImportFileDialog();
    },
    onError: () => {
      toast.error('Nhập file thất bại');
    }
  });
  const handleAddUserByCsv = (file: File) => {
    mutate(file);
  };

  //update and create
  const handleUpdateUser = (id: number) => {
    setCurrentUserId(id);
    setMode('update');
    handleOpenCreateDialog();
  };
  const handleCreateUser = () => {
    setMode('create');
    handleOpenCreateDialog();
  };

  const handleOpenCreateDialog = () => setIsCreateDialogOpen(true);
  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setCurrentUserId(null);
    setMode('create');
  };

  const handleOpenImportFileDialog = () => setIsImportFileDialogOpen(true);
  const handleCloseImportFileDialog = () => setIsImportFileDialogOpen(false);

  // Update position and department
  const handleOpenUpdateDepartmentAndPositionDialog = (userId: number) => {
    setIsUpdateDepartmentAndPositionDialogOpen(true);
    setCurrentUserId(userId);
  };
  const handleCloseUpdateDepartmentAndPositionDialog = () =>
    setIsUpdateDepartmentAndPositionDialogOpen(false);
  const handleSubmitUpdateDP = (data: {
    userId: number;
    jobPositionId: string;
    departmentId: string;
  }) => {
    console.log('updateDP', data);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (data) {
    return (
      <Box>
        <PageHeader>
          <Box>
            <PageTitle label="nhân viên" />
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}
            >
              <InputSearch
                placeholder="Tìm kiếm..."
                onTextChange={debouncedSearch}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <CustomButton
                  label="Thêm người dùng"
                  onClick={handleCreateUser}
                />
                <CustomButton
                  variant="outlined"
                  label="Nhập file CSV"
                  color="primary"
                  onClick={handleOpenImportFileDialog}
                />
              </Box>
            </Box>
          </Box>
        </PageHeader>
        <Box
          sx={{
            mx: 'auto',

            width: DEFAULT_PAGE_WIDTH,
            [theme.breakpoints.down('xl')]: {
              width: '90%'
            }
          }}
        >
          <UserTable
            data={data.data}
            metadata={data.metadata}
            handleChangePage={handleChangePage}
            handleUpdateUser={handleUpdateUser}
            handleOpenDeleteDialog={handleOpenDeleteDialog}
            handleUpdatePosition={handleOpenUpdateDepartmentAndPositionDialog}
          />
        </Box>

        <AddUserDialog
          userProfile={data.data?.find(
            (user: user.User) => user.id === currentUserId
          )}
          mode={mode}
          isOpen={isCreateDialogOpen}
          onClose={handleCloseCreateDialog}
        />
        <ImportFileDialog
          isOpen={isImportFileDialogOpen}
          onClose={handleCloseImportFileDialog}
          onSubmit={handleAddUserByCsv}
        />
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          message={<>Bạn muốn xóa ?</>}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteUser}
        />
        <UserUpdateDepartmentAndPositionDialog
          isOpen={isUpdateDepartmentAndPositionDialogOpen}
          onClose={handleCloseUpdateDepartmentAndPositionDialog}
          onSubmit={handleSubmitUpdateDP}
        />
      </Box>
    );
  }
};

export default UserManagement;
