import { Box, Typography, useTheme } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useState } from 'react';

import { useListFiles } from '@/apis';
import { CustomButton, InputSearch } from '@/components/common';
import { AddDepartmentDialog } from '@/components/dialogs';
import { FileTable } from '@/components/file';
import { BaseTableQueryParams, SelectOption } from '@/types';

const columnHelper = createColumnHelper<any>();

const FileManagement = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [departmentData, setUsers] = useState<SelectOption[]>([]);
  const [queryParams, setQueryParams] = useState<BaseTableQueryParams>({
    page: 1,
    size: 10,
    search: ''
  });

  const { data: response, isLoading } = useListFiles({
    queryParams
  });

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (response) {
    const { data, metadata } = response;

    return (
      <Box>
        <Box sx={{ mx: 'auto', width: '1080px' }}>
          <Box sx={{ py: 3, bgcolor: '#fff' }}>
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.primary.main
              }}
            >
              Hồ sơ
            </Typography>
            <Box
              component="div"
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
              <InputSearch
                placeholder="Tìm kiếm..."
                onTextChange={() => console.log('Searching...')}
              />
              <CustomButton label="Thêm hồ sơ" onClick={handleOpen} />
            </Box>
          </Box>
          <FileTable
            metadata={metadata}
            data={data}
            handleChangePage={handleChangePage}
          />
        </Box>

        <AddDepartmentDialog isOpen={isOpen} onClose={handleClose} />
      </Box>
    );
  }
};

export default FileManagement;
