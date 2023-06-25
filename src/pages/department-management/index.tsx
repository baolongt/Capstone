

// TODO: refactor this page like user page and remove line 4 :D
/* eslint-disable no-unused-vars */


import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getAllDepartments } from '../../apis/department';
import AddIcon from '@mui/icons-material/Add';
import AddDepartmentDialog from '../../components/dialogs/add-department-dialog';
import { Column, SelectOption } from '../../types';
import { UserTable } from '../../components/user';
import {CustomButton} from '../../components/common';
import { HEADER_HEIGHT } from '../../constants/common';

const DepartmentManagement = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<SelectOption[]>([]);

  
  const columns: Column[] = [
    {
      heading: '#',
      minWidth: '30px',
      type: 'text',
      value: 'id'
    },
    {
      heading: 'Tên phòng ban',
      minWidth: '150px',
      type: 'text',
      value: 'name'
    },
    {
      heading: 'Trưởng phòng',
      minWidth: '150px',
      type: 'text',
      value: 'departmentLeaderName'
    }
  ];

  // TODO: refactor this like user 
  const { data: departmentsData } = useQuery({
    queryKey: ['getAllDepartments'],
    queryFn: () => getAllDepartments()
  });


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
        data={departmentsData?.data}
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
