// TODO: refactor this page like user page and remove line 4 :D

import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import React, { useState } from 'react';

import { useListDepartments } from '../../apis/department';
import { CustomButton } from '../../components/common';
import AddDepartmentDialog from '../../components/dialogs/add-department-dialog';
import { UserTable } from '../../components/user';
import { HEADER_HEIGHT } from '../../constants/common';
import { Column, SelectOption } from '../../types';

const DepartmentManagement = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<SelectOption[]>([]);

  //TODO: change to department
  const columns: Column<any>[] = [
    {
      heading: '#',
      minWidth: '30px',
      value: 'id'
    },
    {
      heading: 'Tên phòng ban',
      minWidth: '150px',
      value: 'name'
    },
    {
      heading: 'Trưởng phòng',
      minWidth: '150px',
      value: 'departmentLeaderName'
    }
  ];

  const { data: departmentData } = useListDepartments();

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '16px' }}>
        <CustomButton
          label="Thêm Phòng ban"
          icon={<AddIcon />}
          onClick={handleOpen}
        />
      </Box>
      <UserTable
        height={`calc(100vh - 54px - 50px - ${HEADER_HEIGHT})`}
        data={departmentData?.data}
        columns={columns}
        dataPagination={{}}
      />
      <AddDepartmentDialog
        isOpen={isOpen}
        usersData={users}
        onClose={handleClose}
      />
    </Box>
  );
};

export default DepartmentManagement;
