import { SxProps } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTable from '@/components/common/base-table';
import { incomingDocument } from '@/models';
import { Metadata } from '@/types';

const columnHelper = createColumnHelper<incomingDocument.IncomingDocument>();

export type IncomingDocumentTableProps = {
  data: incomingDocument.IncomingDocument[];
  metadata?: Metadata;
  handleChangePage?: (page: number) => void;
  sx?: SxProps;
};

export const IncomingDocumentTable: React.FC<IncomingDocumentTableProps> = ({
  data,
  metadata,
  handleChangePage,
  sx
}) => {
  const navigate = useNavigate();
  const handleCellClick = (origin: incomingDocument.IncomingDocument) => {
    navigate(`${origin.id}`);
  };

  const columns = [
    columnHelper.accessor('epitomize', {
      header: 'Trích yếu',
      cell: (row) => row.renderValue(),
      size: 300
    }),
    columnHelper.accessor('documentTypeName', {
      header: 'Loại văn bản',
      cell: (row) => row.renderValue(),
      size: 100
    }),
    columnHelper.accessor('createdByName', {
      header: 'Người tạo',
      cell: (row) => row.renderValue(),
      size: 100
    }),
    columnHelper.accessor('isRepliedDocument', {
      header: 'Trạng thái',
      cell: (row) => (row.getValue() ? 'Đã xử lý' : 'Đang xử lí'),
      size: 100
    }),
    columnHelper.accessor('publishDate', {
      header: 'Ngày soạn',
      cell: (row) => moment(row.getValue()).format('DD/MM/YYYY'),
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
        handleCellClick={handleCellClick}
        sx={{
          width: '100%',
          ...sx
        }}
      />
    );
  }
};
