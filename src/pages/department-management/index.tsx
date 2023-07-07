

// TODO: refactor this page like user page and remove line 4 :D
/* eslint-disable no-unused-vars */


import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import AddDepartmentDialog from '../../components/dialogs/add-department-dialog';
import { Column, SelectOption } from '../../types';
import { UserTable } from '../../components/user';
import {CustomButton} from '../../components/common';
import { HEADER_HEIGHT } from '../../constants/common';
import { department } from '../../models';
import { useListDepartments } from '../../apis/department';

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
        onChangePage={() => {}}
        onChangeSize={() => {}}
      />
      <AddDepartmentDialog
        isOpen={isOpen}
        onClose={handleClose}
        usersData={users}
      />
    </Box>
  );
};

export default DepartmentManagement;
