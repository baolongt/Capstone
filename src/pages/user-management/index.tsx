import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useDeleteUser, useListUsers } from '@/apis';
import { CustomButton, InputSearch } from '@/components/common';
import { AddUserDialog, ImportFileDialog } from '@/components/dialogs';
import { ToastMessage } from '@/components/toast';
import { UserTable } from '@/components/user';
import { FOOTER_HEADER_HEIGHT } from '@/constants/common';
import { user } from '@/models';
import { Column, TableState } from '@/types';

const UserManagement = () => {
  const columns: Column<user.User>[] = [
    {
      heading: 'Tên',
      value: 'name'
    },
    {
      heading: 'Email',
      value: 'email'
    },
    {
      heading: 'Căn cước công dân',
      value: 'citizenIdentification'
    },
    {
      heading: 'Vai trò',
      value: 'roleName'
    },
    {
      heading: 'Chức vụ',
      value: 'jobPositionName'
    },
    {
      heading: '',
      value: 'name',
      isAction: true
    }
  ];

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isImportFileDialogOpen, setIsImportFileDialogOpen] =
    useState<boolean>(false);
  const initTableState: TableState = {
    page: 1,
    size: 10
  };

  const theme = useTheme();
  const { data, isLoading } = useListUsers();

  const [tableState, setTableState] = useState<TableState>(initTableState);

  const handleOpenCreateDialog = () => setIsCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setIsCreateDialogOpen(false);

  const handleOpenImportFileDialog = () => setIsImportFileDialogOpen(true);
  const handleCloseImportFileDialog = () => setIsImportFileDialogOpen(false);

  const handleChangePage = (page: number) => {
    setTableState({ ...tableState, page: page });
  };
  const handleChangeSize = (size: number) => {
    setTableState({ ...tableState, page: 1, size: size });
  };

  const { mutate: deleteUserMutate } = useDeleteUser({
    onSuccess: () => {
      toast.success(<ToastMessage message={'Xóa người dùng thành công'} />);
    },
    onError: () => {
      toast.error(<ToastMessage message={'Xóa người dùng thất bại'} />);
    }
  });

  return (
    <Box>
      <Box sx={{ bgcolor: theme.palette.grey[300], px: 6, py: 3 }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <InputSearch
            placeholder="Search..."
            onTextChange={() => console.log('Searching...')}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <CustomButton
              label="Thêm người dùng"
              onClick={handleOpenCreateDialog}
            />
            <CustomButton
              label="Nhập file CSV"
              color="success"
              onClick={handleOpenImportFileDialog}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          height: `calc(100vh - 210px - ${FOOTER_HEADER_HEIGHT})`,
          px: 6,
          py: 3
        }}
      >
        <UserTable
          height={`calc(100vh - 210px - ${FOOTER_HEADER_HEIGHT})`}
          data={data?.data ?? []}
          columns={columns}
          isLoading={isLoading}
          dataPagination={{ totalPages: 10, currentPage: 1 }}
          onChangePage={(newPage: number) => handleChangePage(newPage)}
          onChangeSize={(newSize: number) => handleChangeSize(newSize)}
          onDelete={deleteUserMutate}
        />
      </Box>

      <AddUserDialog
        mode="create"
        isOpen={isCreateDialogOpen}
        onClose={handleCloseCreateDialog}
      />
      <ImportFileDialog
        isOpen={isImportFileDialogOpen}
        onClose={handleCloseImportFileDialog}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={() => {}}
      />
    </Box>
  );
};

export default UserManagement;
