import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, SxProps, Tooltip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTable from '@/components/common/base-table';
import { incomingDocument } from '@/models';
import { DocumentStatusDict } from '@/models/outgoingDocument';
import { Metadata } from '@/types';

const columnHelper = createColumnHelper<incomingDocument.IncomingDocument>();

export type FileDetailIncomingDocumentTableProps = {
  data: incomingDocument.IncomingDocument[];
  metadata?: Metadata;
  handleChangePage?: (page: number) => void;
  sx?: SxProps;
  handleOpenRemoveDoc: (docId: number) => void;
};

export const FileDetailIncomingDocumentTable: React.FC<
  FileDetailIncomingDocumentTableProps
> = ({ data, metadata, handleChangePage, handleOpenRemoveDoc, sx }) => {
  const navigate = useNavigate();
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
        handleCellClick={(cell) => {
          navigate(`/incoming-documents/${cell.id}`);
        }}
        sx={{
          width: '100%',
          ...sx
        }}
      />
    );
  }
};
