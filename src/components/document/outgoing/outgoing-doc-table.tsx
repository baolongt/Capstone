import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import BaseTable from '@/components/common/base-table';
import { outgoingDocument } from '@/models';
import { DocumentStatusDict } from '@/models/outgoingDocument';
import { Metadata } from '@/types';

const columnHelper = createColumnHelper<outgoingDocument.OutgoingDocument>();

export type OutgoingDocumentTableProps = {
  data: outgoingDocument.OutgoingDocument[];
  metadata: Metadata;
  handleChangePage: (page: number) => void;
};

export const OutgoingDocumentTable: React.FC<OutgoingDocumentTableProps> = ({
  data,
  metadata,
  handleChangePage
}) => {
  const columns = [
    columnHelper.accessor('epitomize', {
      header: 'Trích yếu',
      cell: (row) => row.renderValue(),
      size: 300
    }),
    columnHelper.accessor('documentNotation', {
      header: 'Ký hiệu',
      cell: (row) => row.renderValue(),
      size: 50
    }),
    columnHelper.accessor('createdDate', {
      header: 'Ngày soạn thảo',
      cell: (row) => moment(row.getValue()).format('DD/MM/YYYY'),
      size: 100
    }),
    columnHelper.accessor('processHistory', {
      header: 'Trạng thái',
      cell: (row) => DocumentStatusDict.get(row.getValue()[0].status) || '',
      size: 100
    }),
    columnHelper.accessor('note', {
      header: 'Ghi chú',
      size: 300,
      cell: (row) => row.renderValue()
    }),
    columnHelper.accessor('id', {
      header: '',
      size: 100,
      cell: (row) => (
        <>
          <RouterLink to={`${row.getValue()}`}>
            <Tooltip title="Xem chi tiết">
              <IconButton color="primary">
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </RouterLink>
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
