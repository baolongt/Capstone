import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, SxProps, Tooltip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import * as React from 'react';

import BaseTable from '@/components/common/base-table';
import { outgoingDocument } from '@/models';
import { DocumentStatusDict } from '@/models/outgoingDocument';
import { Metadata } from '@/types';

const columnHelper = createColumnHelper<outgoingDocument.OutgoingDocument>();

export type FileDetailOutgoingDocumentTableProps = {
  data: outgoingDocument.OutgoingDocument[];
  metadata?: Metadata;
  handleChangePage?: (page: number) => void;
  sx?: SxProps;
  handleOpenRemoveDoc: (docId: number) => void;
};

export const FileDetailOutgoingDocumentTable: React.FC<
  FileDetailOutgoingDocumentTableProps
> = ({ data, metadata, handleChangePage, handleOpenRemoveDoc, sx }) => {
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
    columnHelper.accessor('processHistory', {
      header: 'Trạng thái',
      cell: (row) => DocumentStatusDict.get(row.getValue()[0]?.status ?? 0),
      size: 100
    }),
    columnHelper.accessor('createdDate', {
      header: 'Ngày soạn',
      cell: (row) => moment(row.getValue()).format('DD/MM/YYYY'),
      size: 100
    }),
    columnHelper.accessor('id', {
      header: '',
      size: 100,
      cell: (row) => (
        <>
          <Tooltip title="Xoá khỏi sổ công việc">
            <IconButton
              color="error"
              onClick={() => handleOpenRemoveDoc(Number(row.renderValue()))}
            >
              <DeleteIcon />
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
          ...sx
        }}
      />
    );
  }
};
