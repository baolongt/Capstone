import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import * as React from 'react';
import { toast } from 'react-toastify';

import { useDeleteDepartment } from '@/apis';
import { department } from '@/models';
import { Metadata } from '@/types';

import BaseTable from '../common/base-table';
import { AddDepartmentDialog, ConfirmDialog } from '../dialogs';

const columnHelper = createColumnHelper<department.Department>();

type DepartmentTableProps = {
  data: department.Department[];
  metadata: Metadata;
  handleChangePage: (page: number) => void;
  handleUpdateDepartment: (departmentId: number) => void;
};
export const DepartmentTable: React.FC<DepartmentTableProps> = ({
  data,
  metadata,
  handleChangePage
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isOpenUpdate, setIsOpenUpdate] = React.useState<boolean>(false);
  const [currentDepartment, setCurrentDepartment] =
    React.useState<department.Department | null>(null);
  const columns = [
    columnHelper.accessor('name', {
      header: 'Tên phòng ban',
      cell: (row) => row.renderValue(),
      size: 100
    }),
    columnHelper.accessor('departmentLeaderName', {
      header: 'Trưởng phòng',
      cell: (row) => row.renderValue(),
      size: 200
    }),
    columnHelper.accessor('id', {
      header: '',
      size: 100,
      cell: (row) => (
        <Box component="div" sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Cập nhật thông tin">
            <IconButton
              color="primary"
              onClick={() => handleSelectDepartment(row.getValue(), false)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá phòng ban">
            <IconButton
              color="primary"
              onClick={() => handleSelectDepartment(row.getValue())}
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
      toast.success('Xóa phòng ban thành công');
      setIsOpen(false);
      setCurrentDepartment(null);
    },
    onError: () => {
      toast.error('Xóa phòng ban thất bại');
    }
  });
  const onDelete = () => {
    if (currentDepartment) {
      mutate({ id: currentDepartment.id });
    }
  };
  const handleSelectDepartment = (id: number, isDelete = true) => {
    const currentDepartment = data.find((department) => department.id === id);
    setCurrentDepartment(currentDepartment!);
    if (isDelete) {
      setIsOpen(true);
    } else {
      setIsOpenUpdate(true);
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
        <AddDepartmentDialog
          data={currentDepartment!}
          mode="update"
          isOpen={isOpenUpdate}
          onClose={() => setIsOpenUpdate(false)}
        />
      </>
    );
  }
};
