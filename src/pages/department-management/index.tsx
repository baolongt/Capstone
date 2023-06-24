import React, { useState } from 'react';
import CustomTable from '../../components/table';
import {
  Column,
  CreateUserPayload,
  UpdateUserPayload
} from '../../models/user';
import { HEADER_HEIGHT } from '../../constants/common';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getAllDepartments } from '../../api/department';
import CustomButton from '../../components/common/button';
import AddIcon from '@mui/icons-material/Add';
import { getAllUsers } from '../../api/admin';
import AddDepartmentDialog from '../../components/dialogs/add-department-dialog';
import { SelectOption } from '../../models/enums';

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

  const { data: departmentsData } = useQuery({
    queryKey: ['getAllDepartments'],
    queryFn: () => getAllDepartments()
  });

  const { } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: async () => await getAllUsers(),
    onSuccess: (data) => {
      const format: SelectOption[] = data.data.map(
        (user: UpdateUserPayload) => {
          return {
            title: user.name,
            value: user.id
          };
        }
      );
      setUsers(format);
    },
    cacheTime: 6 * 50 * 1000,
    staleTime: 5 * 60 * 1000
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
      <CustomTable
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