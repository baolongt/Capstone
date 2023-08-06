// TODO: refactor this page like user page and remove line 4 :D

import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

import { useListDepartments } from '@/apis/department';
import { CustomButton, InputSearch } from '@/components/common';
import { AddDepartmentDialog } from '@/components/dialogs';
import { UserTable } from '@/components/user';
import { FOOTER_HEADER_HEIGHT } from '@/constants/common';
import { Column, SelectOption } from '@/types';

const DepartmentManagement = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [departmentData, setUsers] = useState<SelectOption[]>([]);

  //TODO: change to department
  const columns: Column<any>[] = [
    {
      heading: '#',
      value: 'id'
    },
    {
      heading: 'Tên phòng ban',
      value: 'name'
    },
    {
      heading: 'Trưởng phòng',
      value: 'departmentLeaderName'
    },
    {
      heading: '',
      value: 'id',
      isAction: true
    }
  ];

  const { data, isLoading } = useListDepartments();

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const handleChangePage = (page: number) => {
    //setTableState({ ...tableState, page: page });
  };
  const handleChangeSize = (size: number) => {
    //setTableState({ ...tableState, page: 1, size: size });
  };
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
          Phòng ban
        </Typography>
        <Box
          component="div"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <InputSearch
            placeholder="Tìm kiếm"
            onTextChange={() => console.log('Searching...')}
          />
          <CustomButton label="Thêm phòng ban" onClick={handleOpen} />
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
        <UserTable
          height={`calc(100vh - 210px - ${FOOTER_HEADER_HEIGHT})`}
          data={data?.data ?? []}
          columns={columns}
          isLoading={isLoading}
          dataPagination={{ totalPages: 10, currentPage: 1 }}
          onChangePage={(newPage: number) => handleChangePage(newPage)}
          onChangeSize={(newSize: number) => handleChangeSize(newSize)}
          onDelete={() => console.log()}
        />
      </Box>
      <AddDepartmentDialog isOpen={isOpen} onClose={handleClose} />
    </Box>
  );
};

export default DepartmentManagement;
