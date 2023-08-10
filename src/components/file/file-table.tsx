import { Delete } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import * as React from 'react';

import { file } from '@/models';
import { Metadata } from '@/types';

import BaseTable from '../common/base-table';

export type FileTableProps = {
  data: file.File[];
  metadata: Metadata;
  handleChangePage: (page: number) => void;
};

export const FileTable: React.FC<FileTableProps> = ({
  data,
  metadata,
  handleChangePage
}) => {
  const columnHelper = createColumnHelper<file.File>();

  const columns = [
    columnHelper.accessor('title', {
      header: 'Sổ văn bản',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('fileNotation', {
      header: 'Ký hiệu',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('organCode', {
      header: 'Đơn vị',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('docTotal', {
      header: 'Số văn bản',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('status', {
      header: 'Trạng thái',
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('id', {
      header: 'Action',
      cell: (row) => (
        <>
          <Tooltip title="Xoá sổ văn bản">
            <IconButton color="error">
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      )
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
          minHeight: '90vh'
        }}
      />
    );
  }
};
