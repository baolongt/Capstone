import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import * as React from 'react';
import { toast } from 'react-toastify';

import { useDeleteDocType } from '@/apis/documentType/deleteDocType';
import { documentType } from '@/models';
import { Metadata } from '@/types';

import BaseTable from '../common/base-table';
import { ConfirmDialog } from '../dialogs';

const columnHelper = createColumnHelper<documentType.DocumentType>();

type DocumentTypesTableProps = {
  data: documentType.DocumentType[];
  metadata: Metadata;
  handleChangePage: (page: number) => void;
  openUpdateDialog: (docTypeId: number) => void;
};
export const DocumentTypeTable: React.FC<DocumentTypesTableProps> = ({
  data,
  metadata,
  handleChangePage,
  openUpdateDialog
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { mutate: deleteDocType } = useDeleteDocType({
    onSuccess: () => {
      toast.success('Xóa loại văn bản thành công');
      setIsOpen(false);
    },
    onError: (err) => {
      if (err) {
        toast.error(err);
      } else toast.error('Xóa loại văn bản thất bại');
    }
  });
  const [currentType, setCurrentType] =
    React.useState<documentType.DocumentType | null>(null);
  const columns = [
    columnHelper.accessor('id', {
      header: '#',
      size: 20
    }),
    columnHelper.accessor('name', {
      header: 'Loại văn bản',
      cell: (row) => row.renderValue(),
      size: 100
    }),
    columnHelper.accessor('description', {
      header: 'Mô tả',
      cell: (row) => row.renderValue(),
      size: 200
    }),
    columnHelper.accessor('fieldName', {
      header: 'Lĩnh vực',
      cell: (row) => row.renderValue(),
      size: 200
    }),
    columnHelper.accessor('id', {
      header: '',
      size: 100,
      cell: (row) => (
        <Box component="div" sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Cập nhật">
            <IconButton
              color="primary"
              onClick={() => openUpdateDialog(row.getValue())}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá">
            <IconButton
              color="error"
              onClick={() => handleSelectDocType(row.getValue())}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    })
  ];
  const onDelete = () => {
    if (currentType) {
      deleteDocType(currentType.id);
    }
  };
  const handleSelectDocType = (id: number, isDelete = true) => {
    const docType = data.find((docType) => docType.id === id);
    setCurrentType(docType!);
    if (isDelete) {
      setIsOpen(true);
    }
  };
  if (data) {
    return (
      <>
        <BaseTable
          data={data}
          metadata={metadata}
          handleChangePage={handleChangePage}
          columns={columns}
          sx={{
            width: '100%'
          }}
        />
        <ConfirmDialog
          isOpen={isOpen}
          message={<>Bạn muốn xóa ?</>}
          onClose={() => setIsOpen(false)}
          onConfirm={onDelete}
        />
      </>
    );
  }
};
