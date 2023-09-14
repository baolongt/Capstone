import { Box } from '@mui/material';
import { debounce } from 'lodash';
import React, { useState } from 'react';

import { useListDepartments } from '@/apis/department';
import { CustomButton, InputSearch } from '@/components/common';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import { DepartmentTable } from '@/components/department/department-table';
import { AddDepartmentDialog } from '@/components/dialogs';
import { DEBOUND_SEARCH_TIME, DEFAULT_PAGE_WIDTH } from '@/constants';
import { BaseTableQueryParams } from '@/types';

const DepartmentManagement = () => {
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
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setQueryParams({ ...queryParams, search: e.target.value });
  };
  const debouncedSearch = debounce(handleChangeSearch, DEBOUND_SEARCH_TIME);

  const handleUpdateDepartment = (departmentId: number) => {
    console.log('update', departmentId);
  };

  const handleOpenDeleteDialog = (departmentId: number) => {
    console.log('delete', departmentId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (response) {
    const { data, metadata } = response;

    return (
      <Box>
        <PageHeader>
          <PageTitle label="phòng ban" />
          <Box
            component="div"
            sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}
          >
            <InputSearch
              placeholder="Tìm kiếm"
              onTextChange={debouncedSearch}
            />
            <CustomButton
              size="small"
              label="Thêm phòng ban"
              onClick={handleOpen}
            />
          </Box>
        </PageHeader>
        <Box
          sx={{
            mx: 'auto',
            width: DEFAULT_PAGE_WIDTH
          }}
        >
          <DepartmentTable
            data={data}
            metadata={metadata}
            handleChangePage={handleChangePage}
            handleUpdateDepartment={handleUpdateDepartment}
            //handleOpenDeleteDialog={handleOpenDeleteDialog}
          />
        </Box>

        <AddDepartmentDialog isOpen={isOpen} onClose={handleClose} />
      </Box>
    );
  }
};

export default DepartmentManagement;
