import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Tooltip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import * as React from 'react';
import { toast } from 'react-toastify';

import { useDeleteDepartment } from '@/apis';
import { documentType } from '@/models';
import { Metadata } from '@/types';

import BaseTable from '../common/base-table';

const columnHelper = createColumnHelper<documentType.DocumentType>();

type DocumentTypesTableProps = {
  data: documentType.DocumentType[];
  metadata: Metadata;
  handleChangePage: (page: number) => void;
  handleUpdateDepartment: (departmentId: number) => void;
};
export const DocumentTypeTable: React.FC<DocumentTypesTableProps> = ({
  data,
  metadata,
  handleChangePage
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
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
          <Tooltip title="Xoá">
            <IconButton
              color="primary"
              onClick={() => handleSelectDocType(row.getValue())}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    })
  ];
  const { mutate } = useDeleteDepartment({
    onSuccess: () => {
      toast.success('Xóa thành công');
      setIsOpen(false);
      setCurrentType(null);
    },
    onError: () => {
      toast.error('Xóa thất bại');
    }
  });
  const onDelete = () => {
    if (currentType) {
      mutate({ id: currentType.id });
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
        {/* <ConfirmDialog
          isOpen={isOpen}
          message={<>Bạn muốn xóa ?</>}
          onClose={() => setIsOpen(false)}
          onConfirm={onDelete}
        /> */}
      </>
    );
  }
};
