import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import * as React from 'react';

import { department } from '@/models';
import { Metadata } from '@/types';

import BaseTable from '../common/base-table';

const columnHelper = createColumnHelper<department.Department>();

type DepartmentTableProps = {
  data: department.Department[];
  metadata: Metadata;
  handleChangePage: (page: number) => void;
  handleUpdateDepartment: (departmentId: number) => void;
  handleOpenDeleteDialog: (departmentId: number) => void;
};
export const DepartmentTable: React.FC<DepartmentTableProps> = ({
  data,
  metadata,
  handleChangePage,
  handleUpdateDepartment,
  handleOpenDeleteDialog
}) => {
  const columns = [
    columnHelper.accessor('id', {
      header: '#',
      size: 20
    }),
    columnHelper.accessor('name', {
      header: 'Tên phòng ban',
      cell: (row) => row.renderValue(),
      size: 100
    }),
    columnHelper.accessor('departmentLeaderName', {
      header: 'Trưởng phòng',
      cell: (row) => row.renderValue(),
      size: 200
    }),
    columnHelper.accessor('id', {
      header: '',
      size: 100,
      cell: (row) => (
        <Box component="div" sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Cập nhật thông tin">
            <IconButton
              color="primary"
              onClick={() => handleUpdateDepartment(row.getValue())}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá phòng ban">
            <IconButton
              color="primary"
              onClick={() => handleOpenDeleteDialog(row.getValue())}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    })
  ];

  if (data) {
    return (
      <>
        <BaseTable
          data={data}
          metadata={metadata}
          handleChangePage={handleChangePage}
          columns={columns}
          sx={{
            width: '100%'
          }}
        />
      </>
    );
  }
};
