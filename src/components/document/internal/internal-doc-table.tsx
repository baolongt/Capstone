import { SxProps } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTable from '@/components/common/base-table';
import { internalDocument } from '@/models';
import { InternalDocumentStatusDict } from '@/models/internalDocument';
import { Metadata } from '@/types';

const columnHelper = createColumnHelper<internalDocument.InternalDocument>();

export type InternalDocumentTableProps = {
  data: internalDocument.InternalDocument[];
  metadata?: Metadata;
  handleChangePage?: (page: number) => void;
  sx?: SxProps;
};

export const InternalDocumentTable: React.FC<InternalDocumentTableProps> = ({
  data,
  metadata,
  handleChangePage,
  sx
}) => {
  const navigate = useNavigate();
  const handleCellClick = (origin: internalDocument.InternalDocument) => {
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
    columnHelper.accessor('documentStatus', {
      header: 'Trạng thái',
      cell: (row) => InternalDocumentStatusDict[row.getValue()],
      size: 100
    }),
    columnHelper.accessor('createdDate', {
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
