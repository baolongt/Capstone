import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddUserDialog from '../../components/dialogs/add-user-dialog';
import React from 'react';
import { useDeleteUser, useListUsers } from '../../apis';
import {
  FOOTER_HEADER_HEIGHT,
  FOOTER_HEIGHT,
  HEADER_HEIGHT
} from '../../constants/common';
import { TableState, Column } from '../../types';
import { CustomButton } from '../../components/common';
import { user } from '../../models';
import { useTheme } from '@mui/material';
import InputSearch from '../../components/common/search';
import { CustomTable } from '../../components/user/table';
import { ToastMessage } from '../../components/toast';
import { toast } from 'react-toastify';
import ImportFileDialog from '../../components/dialogs/import-file-dialog';

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
  const [isImportFileDialogOpen, setIsImportFileDialogOpen] = useState<boolean>(false);
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
          <Box sx = {{display: 'flex', gap: 2}}>
            <CustomButton
              label="Thêm người dùng"
              onClick={handleOpenCreateDialog}
            />
            <CustomButton
              label="Nhập file CSV"
              onClick={handleOpenImportFileDialog}
              color='success'
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
        <CustomTable
          height={`calc(100vh - 210px - ${FOOTER_HEADER_HEIGHT})`}
          data={data?.data ?? []}
          columns={columns}
          isLoading={isLoading}
          onChangePage={(newPage: number) => handleChangePage(newPage)}
          onChangeSize={(newSize: number) => handleChangeSize(newSize)}
          dataPagination={{ totalPages: 10, currentPage: 1 }}
          onDelete={deleteUserMutate}
        />
      </Box>

      <AddUserDialog
        mode="create"
        isOpen={isCreateDialogOpen}
        onClose={handleCloseCreateDialog}
      />
      <ImportFileDialog
        isOpen = {isImportFileDialogOpen}
        onClose={handleCloseImportFileDialog}
        onSubmit={()=> {}}
      />
    </Box>
  );
};

export default UserManagement;
