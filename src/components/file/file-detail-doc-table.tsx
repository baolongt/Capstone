import { SxProps } from '@mui/material';
import * as React from 'react';

import { incomingDocument, internalDocument, outgoingDocument } from '@/models';
import { Metadata } from '@/types';

import { FileDetailIncomingDocumentTable } from './file-detail-incoming-table';
import { FileDetailInternalDocumentTable } from './file-detail-internal-table';
import { FileDetailOutgoingDocumentTable } from './file-detail-outgoing-table';

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
