// TODO: refactor this page like user page and remove line 4 :D
import { Box, Typography, useTheme } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useState } from 'react';

import { useListFiles } from '@/apis';
import { CustomButton, InputSearch } from '@/components/common';
import { AddDepartmentDialog } from '@/components/dialogs';
import { FOOTER_HEADER_HEIGHT } from '@/constants/common';
import { SelectOption } from '@/types';

const columnHelper = createColumnHelper<any>();

const FileManagement = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [departmentData, setUsers] = useState<SelectOption[]>([]);

  const columns = [
    columnHelper.accessor('title', {
      header: 'Tiêu đề',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('fileCreatedYear', {
      header: 'Ngày tạo',
      cell: (row) => row.renderValue()
    }),

    columnHelper.accessor('fileNotation', {
      header: 'Số hiệu',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('creatorId', {
      header: () => 'Người tạo',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('language', {
      header: () => 'Ngôn ngữ',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('docTotal', {
      header: () => 'Tổng số tài liệu',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('status', {
      header: () => 'Trạng thái',
      cell: (row) => row.renderValue()
    })
  ];
  const { data, isLoading } = useListFiles({
    queryParams: { page: 2, size: 10 }
  });

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  // const handleChangePage = (page: number) => {
  //   //setTableState({ ...tableState, page: page });
  // };
  // const handleChangeSize = (size: number) => {
  //   //setTableState({ ...tableState, page: 1, size: size });
  // };
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
          Hồ sơ
        </Typography>
        <Box
          component="div"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <InputSearch
            placeholder="Tìm kiếm..."
            onTextChange={() => console.log('Searching...')}
          />
          <CustomButton label="Thêm hồ sơ" onClick={handleOpen} />
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
        {/* <BaseTable data={data} columns={columns}></BaseTable> */}
      </Box>
      <AddDepartmentDialog isOpen={isOpen} onClose={handleClose} />
    </Box>
  );
};

export default FileManagement;
