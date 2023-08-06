import { Button } from '@mui/base';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography, useTheme } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
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
import { User } from '@/models/user';

const columnHelper = createColumnHelper<User>();

const UserManagement = () => {
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
        <>
          <Button
            color="primary"
            onClick={() => handleUpateUser(row.getValue())}
          >
            <EditIcon />
          </Button>
          <Button
            color="error"
            onClick={() => handleOpenDeleteDialog(row.getValue())}
          >
            <DeleteIcon />
          </Button>
        </>
      )
    })
  ];
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isImportFileDialogOpen, setIsImportFileDialogOpen] =
    useState<boolean>(false);

  const theme = useTheme();
  const { data, isLoading } = useListUsers();
  console.log(data);
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
              onTextChange={() => console.log('Searching...')}
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
            data={data!}
            columns={columns}
            style={{
              height: `calc(100vh - 210px - ${FOOTER_HEADER_HEIGHT})`,
              overflow: 'scroll'
            }}
          ></BaseTable>
        </Box>

        <AddUserDialog
          userProfile={data?.find((user) => user.id === currentUserId)}
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
