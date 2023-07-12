import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import TableFooter from '@mui/material/TableFooter';
import _ from 'lodash';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useDeleteUser } from '../../../apis';
import { user } from '../../../models';
import { Column, Nullable } from '../../../types';
import AddUserDialog from '../../dialogs/add-user-dialog';
import ConfirmDialog from '../../dialogs/confirm-dialog';
import { ToastMessage } from '../../toast';
import UserTableHead from './table-head';
import TablePagination from './table-pagination';

interface UserTableProps {
  data: user.User[];
  columns: Column<user.User>[];
  dataPagination: any;

  onChangePage?: (newPage: number) => void;

  onChangeSize?: (newSize: number) => void;
  isLoading?: boolean;
  height: string;
}

export const UserTable: React.FC<UserTableProps> = ({
  data,
  columns,
  onChangePage,
  onChangeSize,
  dataPagination,
  height
}) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentUser, setCurentUser] =
    useState<Nullable<user.UpdatePayload>>(null);

  const handleOpenUpdateDialog = () => setIsUpdateDialogOpen(true);
  const handleCloseUpdateDialog = () => setIsUpdateDialogOpen(false);

  const handleCloseDeleteDialog = () => setIsDeleteDialogOpen(false);
  const { mutate: deleteUserMutate } = useDeleteUser({
    onSuccess: () => {
      handleCloseDeleteDialog();
      toast.success(<ToastMessage message={'Xóa người dùng thành công'} />);
    },
    onError: () => {
      toast.error(<ToastMessage message={'Xóa người dùng thất bại'} />);
    }
  });

  const debounceGotoPage = _.debounce((value) => {
    if (/^-?\d+$/.test(value) && value) {
      if (
        parseInt(value) <= dataPagination.totalPages &&
        parseInt(value) > 0 &&
        parseInt(value) !== dataPagination.currentPage
      ) {
        onChangePage?.(value);
      }
    }
  }, 1000);

  const handleOpenDeleteDialog = (user: user.User) => {
    setCurentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = () => {
    if (currentUser?.id) {
      deleteUserMutate(currentUser);
    }
  };

  const handleUpateUser = (user: user.User) => {
    setCurentUser(user);
    handleOpenUpdateDialog();
  };

  return (
    <Box width={'100%'}>
      <TableContainer
        sx={{
          height: height,
          border: '1px solid #ccc'
        }}
      >
        <Table
          stickyHeader
          sx={{ minWidth: '900px', minHeight: '800px' }}
          size="medium"
        >
          <UserTableHead columns={columns} />
          <TableBody>
            {data &&
              data.map((user: user.User, index: number) => (
                <TableRow key={index} hover>
                  {columns.map((column: Column<user.User>, index: number) => {
                    return column.isAction ? (
                      <TableCell key={index} sx={{ minWidth: column.minWidth }}>
                        {user.getprop(column.value)}
                      </TableCell>
                    ) : (
                      <TableCell key={index}>
                        <Stack direction={'row'} gap={1}>
                          <IconButton onClick={() => handleUpateUser(user)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleOpenDeleteDialog(user)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TableFooter style={{ position: 'sticky', bottom: 0 }}>
          <TableRow>
            <TablePagination
              page={dataPagination.currentPage}
              rowsPerPage={dataPagination.itemsPerPage}
              elementsCount={dataPagination.totalElements}
              totalPages={dataPagination.totalPages}
              totalElements={dataPagination.totalElements}
              selected={[]}
              option={[10, 15, 20, 25]}
              handleChangePage={(_, value) => {
                onChangePage?.(value);
              }}
              handleChangeRowsPerPage={(e) => {
                onChangeSize?.(e.target.value);
              }}
              handleChangeGoToPage={(e) => {
                debounceGotoPage(e.target.value);
              }}
            />
          </TableRow>
        </TableFooter>
      </TableContainer>
      <AddUserDialog
        userProfile={currentUser}
        mode="update"
        isOpen={isUpdateDialogOpen}
        onClose={handleCloseUpdateDialog}
      />
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        message={
          <>
            Bạn muốn xóa <strong>{currentUser?.name}</strong> ?
          </>
        }
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteUser}
      />
    </Box>
  );
};
