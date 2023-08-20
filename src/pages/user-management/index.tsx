import { Box, Typography, useTheme } from '@mui/material';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useDeleteUser, useListUsers } from '@/apis';
import { CustomButton, InputSearch } from '@/components/common';
import {
  AddUserDialog,
  ConfirmDialog,
  ImportFileDialog
} from '@/components/dialogs';
import { UserTable } from '@/components/user';
import { DEBOUND_SEARCH_TIME } from '@/constants';
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

  const theme = useTheme();
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
    handleCloseDeleteDialog();
  };

  //update and create
  const handleUpateUser = (id: number) => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return (
      <Box>
        <Box sx={{ mx: 'auto', width: '1080px' }}>
          <Box sx={{ py: 3 }}>
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.primary.main,
                mb: 2
              }}
            >
              Nhân viên
            </Typography>
            <Box
              component="div"
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <InputSearch
                placeholder="Tìm kiếm..."
                onTextChange={debouncedSearch}
              />
              <Box component="div" sx={{ display: 'flex', gap: 2 }}>
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
          <UserTable
            data={data.data}
            metadata={data.metadata}
            handleChangePage={handleChangePage}
            handleUpateUser={handleUpateUser}
            handleOpenDeleteDialog={handleOpenDeleteDialog}
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
          onSubmit={() => {
            return;
          }}
        />
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          message={<>Bạn muốn xóa ?</>}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteUser}
        />
      </Box>
    );
  }
};

export default UserManagement;
