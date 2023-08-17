import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

import { useListDepartments } from '@/apis/department';
import { CustomButton, InputSearch } from '@/components/common';
import { DepartmentTable } from '@/components/department/department-table';
import { AddDepartmentDialog } from '@/components/dialogs';
import { BaseTableQueryParams } from '@/types';

const DepartmentManagement = () => {
  const theme = useTheme();
  const [queryParams, setQueryParams] = useState<BaseTableQueryParams>({
    page: 1,
    size: 10,
    search: ''
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: response, isLoading } = useListDepartments({
    queryParams
  });

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  const handleUpdateDepartment = (departmentId: number) => {
    console.log('update');
  };

  const handleOpenDeleteDialog = (departmentId: number) => {
    console.log('delete');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (response) {
    const { data, metadata } = response;

    return (
      <Box>
        <Box sx={{ mx: 'auto', width: '1080px' }}>
          <Box sx={{ py: 3 }}>
            <Typography
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

          <DepartmentTable
            data={data}
            metadata={metadata}
            handleChangePage={handleChangePage}
            handleUpdateDepartment={handleUpdateDepartment}
            handleOpenDeleteDialog={handleOpenDeleteDialog}
          />
        </Box>
        <AddDepartmentDialog isOpen={isOpen} onClose={handleClose} />
      </Box>
    );
  }
};

export default DepartmentManagement;
