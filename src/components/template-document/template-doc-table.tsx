import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, Link, SxProps, Tooltip } from '@mui/material';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import * as React from 'react';

import BaseTable from '@/components/common/base-table';
import useAuth from '@/hooks/useAuth';
import { template } from '@/models';
import { JobPosition } from '@/models/user';
import { Metadata } from '@/types';

const columnHelper = createColumnHelper<template.Template>();

export type TemplateTableProps = {
  data: template.Template[];
  metadata?: Metadata;
  handleChangePage?: (page: number) => void;
  sx?: SxProps;
  handleDelete?: (id: number) => void;
};

export const TemplateDocTable: React.FC<TemplateTableProps> = ({
  data,
  metadata,
  handleChangePage,
  sx,
  handleDelete
}) => {
  const auth = useAuth();
  const { user } = auth.authState;

  const columns = [
    columnHelper.accessor('name', {
      header: 'Tên',
      cell: (row) => row.renderValue(),
      size: 300
    }),
    columnHelper.accessor('description', {
      header: ' Nội dung',
      cell: (row) => row.renderValue(),
      size: 300
    }),
    columnHelper.accessor('createdAt', {
      header: 'Ngày tạo',
      cell: (row) => moment(row.getValue()).format('DD/MM/YYYY'),
      size: 100
    }),
    columnHelper.accessor('url', {
      header: '',
      cell: (row) => {
        return (
          <Tooltip title="Tải xuống">
            <Link
              sx={{ color: 'inherit' }}
              href={row.getValue()}
              underline="none"
              component={IconButton}
            >
              <DownloadIcon />
            </Link>
          </Tooltip>
        );
      },
      size: 20
    })
  ];

  if (user && user?.jobPositionID === JobPosition.VAN_THU) {
    columns.push(
      columnHelper.accessor('id', {
        header: '',
        cell: (row) => {
          return (
            <Tooltip title="Xoá">
              <IconButton
                sx={{ color: 'inherit' }}
                onClick={() => handleDelete?.(row.getValue())}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          );
        },
        size: 20
      }) as ColumnDef<template.Template>
    );
  }

  if (data) {
    return (
      <BaseTable
        data={data}
        metadata={metadata}
        handleChangePage={handleChangePage}
        columns={columns}
        sx={{
          width: '100%',
          ...sx
        }}
      />
    );
  }
};
