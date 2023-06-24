import { Box } from '@mui/material';
import CustomTable from '../../components/table';
import CustomButton from '../../components/common/button';

import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddUserDialog from '../../components/dialogs/add-user-dialog';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../api/admin';
import { HEADER_HEIGHT } from '../../constants/common';
import { TableState } from '../../models/table';
import { Column } from '../../models/user';

const UserManagement = () => {
  const columns: Column[] = [
    {
      heading: 'STT',
      minWidth: '30px',
      type: 'text',
      value: 'id'
    },
    {
      heading: 'Tên',
      minWidth: '200px',
      type: 'text',
      value: 'name'
    },
    {
      heading: 'Email',
      minWidth: '200px',
      type: 'text',
      value: 'email'
    },
    {
      heading: 'Căn cước công dân',
      minWidth: '300px',
      type: 'text',
      value: 'citizenIdentification'
    },
    {
      heading: 'Vai trò',
      minWidth: '100px',
      type: 'text',
      value: 'roleName'
    },
    {
      heading: 'Chức vụ',
      minWidth: '200px',
      type: 'text',
      value: 'jobPositionName'
    },
    {
      heading: 'Action',
      minWidth: '200px',
      type: 'text',
      value: ''
    }
  ];

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const initTableState: TableState = {
    page: 1,
    size: 10
  };
  const { data, isLoading } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: async () => await getAllUsers(),
    cacheTime: 5*1000,
    staleTime: 4*1000,
  });

  const [tableState, setTableState] = useState<TableState>(initTableState);

  const handleOpenCreateDialog = () => setIsCreateDialogOpen(true);
  const handleCloseCreateDialog = () => setIsCreateDialogOpen(false);

  const handleChangePage = (page: number) => {
    setTableState({ ...tableState, page: page });
  };
  const handleChangeSize = (size: number) => {
    setTableState({ ...tableState, page: 1, size: size });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '16px' }}>
        <CustomButton
          label="Thêm người dùng"
          icon={<AddIcon />}
          onClick={handleOpenCreateDialog}
        />
      </Box>

      <Box flexGrow={1} height={`calc(100vh - 86px - ${HEADER_HEIGHT})`}>
        <CustomTable
          height={`calc(100vh - 32px - 54px - 50px - ${HEADER_HEIGHT})`}
          data={data?.data}
          columns={columns}
          isLoading={isLoading}
          onChangePage={(newPage: number) => handleChangePage(newPage)}
          onChangeSize={(newSize: number) => handleChangeSize(newSize)}
          dataPagination={{ totalPages: 10, currentPage: 1 }}
        />
      </Box>

      <AddUserDialog
        mode="create"
        isOpen={isCreateDialogOpen}
        onClose={handleCloseCreateDialog}
      />
    </Box>
  );
};

export default UserManagement;
