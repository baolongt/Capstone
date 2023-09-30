import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Box, IconButton, Tooltip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import * as React from 'react';

import { User } from '@/models/user';
import { Metadata } from '@/types';

import BaseTable from '../common/base-table';

const columnHelper = createColumnHelper<User>();

type UserTableProps = {
  data: User[];
  metadata: Metadata;
  handleChangePage: (page: number) => void;
  handleUpdatePosition?: (userId: number) => void;
  handleUpdateUser: (userId: number) => void;
  handleOpenDeleteDialog: (userId: number) => void;
};

export const UserTable: React.FC<UserTableProps> = ({
  data,
  metadata,
  handleChangePage,
  handleUpdateUser,
  handleOpenDeleteDialog,
  handleUpdatePosition
}) => {
  const columns = [
    columnHelper.accessor('name', {
      header: 'Tên',
      cell: (row) => row.renderValue(),
      size: 100
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (row) => row.renderValue(),
      size: 100
    }),

    columnHelper.accessor('roleName', {
      header: 'Vai trò',
      cell: (row) => row.renderValue(),
      size: 100
    }),
    columnHelper.accessor('jobPositionName', {
      header: 'Chức vụ',
      cell: (row) => row.renderValue(),
      size: 100
    }),

    columnHelper.accessor('id', {
      header: '',
      size: 100,
      cell: (row) => (
        <Box component="div" sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Cập nhật phòng ban/chức vụ">
            <IconButton
              color="primary"
              onClick={() => handleUpdatePosition?.(row.getValue())}
            >
              <ManageAccountsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cập nhật thông tin">
            <IconButton
              color="primary"
              onClick={() => handleUpdateUser(row.getValue())}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá nhân viên">
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
  return (
    <BaseTable
      data={data}
      metadata={metadata}
      handleChangePage={handleChangePage}
      columns={columns}
      sx={{
        width: '100%'
      }}
    />
  );
};
