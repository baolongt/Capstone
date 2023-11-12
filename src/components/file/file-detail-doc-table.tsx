import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, SxProps, Tooltip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import moment from 'moment';
import * as React from 'react';

import { incomingDocument, internalDocument, outgoingDocument } from '@/models';
import { DocumentStatusDict } from '@/models/outgoingDocument';
import { Metadata } from '@/types';

import { FileDetailIncomingDocumentTable } from './file-detail-incoming-table';
import { FileDetailInternalDocumentTable } from './file-detail-internal-table';
import { FileDetailOutgoingDocumentTable } from './file-detail-outgoing-table';

const columnHelper = createColumnHelper<outgoingDocument.OutgoingDocument>();

export type FileDetailDocsTableProps = {
  data:
    | outgoingDocument.OutgoingDocument[]
    | incomingDocument.IncomingDocument[]
    | internalDocument.InternalDocument[];
  docType: 'outgoing' | 'incoming' | 'internal';
  metadata?: Metadata;
  handleChangePage?: (page: number) => void;
  sx?: SxProps;
  handleOpenRemoveDoc: (docId: number) => void;
};

export const FileDetailDocsTable: React.FC<FileDetailDocsTableProps> = ({
  data,
  metadata,
  handleChangePage,
  handleOpenRemoveDoc,
  sx,
  docType
}) => {
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
  if (!data) return <>Không có dữ liệu</>;

  switch (docType) {
    case 'outgoing':
      return (
        <FileDetailOutgoingDocumentTable
          data={data as outgoingDocument.OutgoingDocument[]}
          metadata={metadata}
          handleChangePage={handleChangePage}
          handleOpenRemoveDoc={handleOpenRemoveDoc}
          sx={{
            ...sx
          }}
        />
      );
    case 'incoming':
      return (
        <FileDetailIncomingDocumentTable
          data={data as incomingDocument.IncomingDocument[]}
          metadata={metadata}
          handleChangePage={handleChangePage}
          handleOpenRemoveDoc={handleOpenRemoveDoc}
          sx={{
            ...sx
          }}
        />
      );
    case 'internal':
      return (
        <FileDetailInternalDocumentTable
          data={data as internalDocument.InternalDocument[]}
          metadata={metadata}
          handleChangePage={handleChangePage}
          handleOpenRemoveDoc={handleOpenRemoveDoc}
          sx={{
            ...sx
          }}
        />
      );
  }
};
