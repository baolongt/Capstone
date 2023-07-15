import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserTableHead from './table-head';
import { user } from '../../../models';
import { useDeleteUser } from '../../../apis';
import React, { useState } from 'react';
import AddUserDialog from '../../dialogs/add-user-dialog';
import ConfirmDialog from '../../dialogs/confirm-dialog';
import { ToastMessage } from '../../toast';
import { toast } from 'react-toastify';
import TablePagination from './table-pagination';
import { debounce } from 'lodash';
import { Column, Nullable } from '../../../types';
import TableFooter from '@mui/material/TableFooter';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface CustomTableProps {
  data: user.User[];
  columns: Column<user.User>[];
  dataPagination: any;
  onDelete?: UseMutateFunction<AxiosResponse<any, any>, unknown, number, unknown>;
  onUpdate?: (id: number) => void; 
  // eslint-disable-next-line no-unused-vars
  onChangePage: (newPage: number) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeSize: (newSize: number) => void;
  isLoading?: boolean;
  height: string;
}

export const CustomTable: React.FC<CustomTableProps> = ({
  data,
  columns,
  onChangePage,
  onChangeSize,
  dataPagination,
  height,
  onDelete
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

  const debounceGotoPage = debounce((value) => {
    if (/^-?\d+$/.test(value) && value) {
      if (
        parseInt(value) <= dataPagination.totalPages &&
        parseInt(value) > 0 &&
        parseInt(value) !== dataPagination.currentPage
      ) {
        onChangePage(value);
      }
    }
  }, 1000);

  const handleOpenDeleteDialog = (user: user.User) => {
    setCurentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = () => {
    onDelete?.(currentUser.id);
    handleCloseDeleteDialog();
  }

  const handleUpateUser = (user: user.User) => {
    setCurentUser(user);
    handleOpenUpdateDialog();
  };

  return (
    <Box width={'100%'}>
      <TableContainer
        sx={{
          height: height
        }}
      >
        <Table
          stickyHeader
          sx={{ minWidth: '900px'}}
          size="medium"
        >
          <UserTableHead columns={columns} />
          <TableBody>
            {data &&
              data.map((user: user.User, index: number) => (
                <TableRow key={index} hover>
                  {columns.map((column: Column<user.User>, index: number) => {
                    return !column.isAction ? (
                      <TableCell sx={{ minWidth: column.minWidth }} key={index}>
                        {user[column.value]}
                      </TableCell>
                    ) : (
                      <TableCell key={index}>
                        <Stack direction={'row'} gap={1}>
                          <Button onClick={() => handleUpateUser(user)} color="primary">
                            Update
                          </Button>
                          <Button onClick={() => handleOpenDeleteDialog(user)} color="error">
                            Delete
                          </Button>
                          {/* <IconButton
                            onClick={() => handleOpenDeleteDialog(user)}
                          >
                            <DeleteIcon />
                          </IconButton> */}
                        </Stack>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* <TableFooter style={{ position: 'sticky', bottom: 0 }}>
          <TableRow> */}

          {/* </TableRow>
        </TableFooter> */}

      </TableContainer>
            <TablePagination
              page={dataPagination.currentPage}
              rowsPerPage={dataPagination.itemsPerPage}
              elementsCount={dataPagination.totalElements}
              totalPages={dataPagination.totalPages}
              totalElements={dataPagination.totalElements}
              selected={[]}
              option={[10, 15, 20, 25]}
              handleChangePage={(_, value) => {
                onChangePage(value);
              }}
              handleChangeRowsPerPage={(e) => {
                onChangeSize(e.target.value);
              }}
              handleChangeGoToPage={(e) => {
                debounceGotoPage(e.target.value);
              }}
            />
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
