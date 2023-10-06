import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, Link, SxProps, Tooltip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import * as React from 'react';

import BaseTable from '@/components/common/base-table';
import { template } from '@/models';
import { Metadata } from '@/types';

const columnHelper = createColumnHelper<template.Template>();

export type TemplateTableProps = {
  data: template.Template[];
  metadata?: Metadata;
  handleChangePage?: (page: number) => void;
  sx?: SxProps;
};

export const TemplateDocTable: React.FC<TemplateTableProps> = ({
  data,
  metadata,
  handleChangePage,
  sx
}) => {
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
      size: 100
    })
  ];

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
