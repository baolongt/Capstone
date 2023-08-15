import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import * as React from 'react';
import { toast } from 'react-toastify';

import { useDeleteFile } from '@/apis';
import { file } from '@/models';
import { File } from '@/models/file';
import { Metadata } from '@/types';

import BaseTable from '../common/base-table';
import CreateUpdateFileDialog from '../dialogs/create-update-file-dialog';
import DeleteDialog from '../dialogs/delete-dialog';

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
  console.log(data);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = React.useState<boolean>(false);
  const [currentFile, SetCurrentFile] = React.useState<file.File | null>(null);
  const { mutate } = useDeleteFile({
    onSuccess: () => {
      toast.success('Xóa sổ văn bản thành công');
      setIsOpen(false);
      SetCurrentFile(null);
    },
    onError: () => {
      toast.error('Xóa sổ văn bản thất bại');
    }
  });
  const onDelete = () => {
    if (currentFile) {
      mutate(currentFile.id);
    }
  };
  const targetFile = (id: number, isDelete = true) => {
    const file = data.find((file) => file.id === id);
    SetCurrentFile(file!);
    if (isDelete) {
      setIsOpen(true);
    } else {
      setIsOpenDelete(true);
    }
  };
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
        <Stack gap={2}>
          <Tooltip title="Xoá">
            <IconButton
              color="primary"
              onClick={() => targetFile(row.getValue())}
            >
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cập nhật">
            <IconButton
              color="primary"
              onClick={() => targetFile(row.getValue(), false)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    })
  ];

  if (data) {
    return (
      <>
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
        <DeleteDialog
          isOpen={isOpen}
          message="Thao tác này sẽ xóa sổ văn bản"
          onClose={() => setIsOpen(false)}
          onConfirm={onDelete}
        />
        <CreateUpdateFileDialog
          data={currentFile!}
          mode="update"
          isOpen={isOpenDelete}
          onClose={() => setIsOpenDelete(false)}
        />
      </>
    );
  }
};
