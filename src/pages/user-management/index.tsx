import { Button } from '@mui/base';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useDeleteUser, useListUsers } from '@/apis';
import { CustomButton, InputSearch } from '@/components/common';
import BaseTable from '@/components/common/base-table';
import {
  AddUserDialog,
  ConfirmDialog,
  ImportFileDialog
} from '@/components/dialogs';
import { ToastMessage } from '@/components/toast';
import { FOOTER_HEADER_HEIGHT } from '@/constants/common';
import { user } from '@/models';
import { User } from '@/models/user';
import { BaseTableQueryParams } from '@/types';

const columnHelper = createColumnHelper<User>();

const UserManagement = () => {
  const [queryParams, setQueryParams] = React.useState<BaseTableQueryParams>({
    page: 1,
    size: 3,
    search: ''
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [mode, setMode] = useState<'update' | 'create'>('create');
  const columns = [
    columnHelper.accessor('name', {
      header: 'Tên',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (row) => row.renderValue()
    }),

    columnHelper.accessor('citizenIdentification', {
      header: 'Căn cước công dân',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('roleName', {
      header: () => 'Vai trò',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('jobPositionName', {
      header: () => 'Chức vụ',
      cell: (row) => row.renderValue()
    }),

    columnHelper.accessor('id', {
      header: '',
      cell: (row) => (
        <Box component="div" sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Cập nhật thông tin">
            <IconButton
              color="primary"
              onClick={() => handleUpateUser(row.getValue())}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá nhân viên">
            <IconButton
              color="primary"
              onClick={() => handleOpenDeleteDialog(row.getValue())}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    })
  ];
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
  const debouncedSearch = debounce(handleSearch, 500);
  //delete User
  const { mutate: deleteUserMutate } = useDeleteUser({
    onSuccess: () => {
      toast.success(<ToastMessage message={'Xóa người dùng thành công'} />);
    },
    onError: () => {
      toast.error(<ToastMessage message={'Xóa người dùng thất bại'} />);
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
      <Box component="div">
        <Box
          component="div"
          sx={{ bgcolor: theme.palette.grey[300], px: 6, py: 3 }}
        >
          <Typography
            component={'h4'}
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

        <Box
          component="div"
          sx={{
            flexGrow: 1,
            height: `calc(100vh - 210px - ${FOOTER_HEADER_HEIGHT})`,
            px: 6,
            py: 3
          }}
        >
          <BaseTable
            handleChangePage={handleChangePage}
            metadata={(data as any)?.metadata}
            data={data.data}
            columns={columns}
            style={{
              height: `calc(100vh - 210px - ${FOOTER_HEADER_HEIGHT})`,
              overflow: 'scroll'
            }}
          ></BaseTable>
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
