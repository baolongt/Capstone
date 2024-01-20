import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import * as React from 'react';
import { toast } from 'react-toastify';

import { useDeleteContact } from '@/apis/contact';
import { contact } from '@/models';
import { Metadata } from '@/types';

import BaseTable from '../common/base-table';
import { CreateContactDialog } from '../dialogs';
import DeleteDialog from '../dialogs/delete-dialog';

const columnHelper = createColumnHelper<contact.Contact>();

type ContactTableProps = {
  data: contact.Contact[];
  metadata: Metadata;
  handleChangePage: (page: number) => void;
  //   handleUpdateContact: (contactId: number) => void;
};
export const ContactTable: React.FC<ContactTableProps> = ({
  data,
  metadata,
  handleChangePage
  //   handleUpdateDepartment
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isOpenCreateDialog, setIsOpenCreateDialog] =
    React.useState<boolean>(false);
  const [currentContact, setCurrentContact] =
    React.useState<contact.Contact | null>(null);
  const columns = [
    columnHelper.accessor('name', {
      header: 'Tên đơn vị',
      cell: (row) => row.renderValue(),
      size: 350
    }),
    columnHelper.accessor('organCode', {
      header: 'Mã đơn vị',
      cell: (row) => row.renderValue(),
      size: 100
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (row) => row.renderValue(),
      size: 150
    }),
    columnHelper.accessor('phone', {
      header: 'Điện thoại',
      cell: (row) => row.renderValue(),
      size: 100
    }),
    columnHelper.accessor('id', {
      header: '',
      size: 100,
      cell: (row) => (
        <Box component="div" sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Cập nhật thông tin">
            <IconButton
              color="primary"
              onClick={() => handleSelectContact(row.getValue(), false)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xoá đơn vị">
            <IconButton
              color="primary"
              onClick={() => handleSelectContact(row.getValue())}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    })
  ];
  const { mutate } = useDeleteContact({
    onSuccess: () => {
      toast.success('Xóa đơn vị thành công');
      setIsOpen(false);
      setCurrentContact(null);
    },
    onError: () => {
      toast.error('Xóa đơn vị thất bại');
    }
  });
  const onDelete = () => {
    if (currentContact) {
      mutate({ id: currentContact.id });
    }
  };
  const handleSelectContact = (id: number, isDelete = true) => {
    const currentContact = data.find((contact) => contact.id === id);
    console.log(currentContact);
    if (currentContact) {
      setCurrentContact(currentContact);
    }
    if (isDelete) {
      setIsOpen(true);
    } else {
      setIsOpenCreateDialog(true);
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
        <DeleteDialog
          isOpen={isOpen}
          message="Thao tác này sẽ xóa đơn vị"
          onClose={() => setIsOpen(false)}
          onConfirm={onDelete}
        />

        <CreateContactDialog
          data={currentContact as contact.Contact}
          mode="update"
          isOpen={isOpenCreateDialog}
          onClose={() => {
            setIsOpenCreateDialog(false);
            setCurrentContact(null);
          }}
        />
      </>
    );
  }
};
