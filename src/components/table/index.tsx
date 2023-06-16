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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CustomTableHead from './table-head';
import { Column, UpdateUserPayload } from '../../models/user';
import { HEADER_HEIGHT } from '../../constants/common';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { deleteUser, getAllUsers } from '../../api/admin';
import React, { useState } from 'react';
import AddUserDialog from '../dialogs/add-user-dialog';
import ConfirmDialog from '../dialogs/confirm-dialog';
import { ToastMessage } from '../toast';
import { toast } from 'react-toastify';
import TablePagination from './table-pagination';
import { TableState } from '../../models/table';
import { debounce } from 'lodash';
interface CustomTableProps {
  data: any[];
  columns: Column[];
  dataPagination: any;
  onChangePage: (newPage: number) => void;
  onChangeSize: (newSize: number) => void;
  isLoading?: boolean;
  height: string; 
}

const CustomTable = (props: CustomTableProps) => {
  const {
    data,
    columns,
    onChangePage,
    onChangeSize,
    dataPagination,
    height,
    isLoading
  } = props;
  const queryClient = useQueryClient();

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const [currentUser, setCurentUser] = useState<UpdateUserPayload | undefined>(
    null
  );

  const handleOpenUpdateDialog = () => setIsUpdateDialogOpen(true);
  const handleCloseUpdateDialog = () => setIsUpdateDialogOpen(false);

  const handleCloseDeleteDialog = () => setIsDeleteDialogOpen(false);
  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: async (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllUsers'] });
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

  const handleOpenDeleteDialog = (user: UpdateUserPayload) => {
    setCurentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = () => deleteUserMutate((currentUser as any)?.id);

  const handleUpateUser = (user: UpdateUserPayload) => {
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
        <Table stickyHeader sx={{ minWidth: '900px' }} size="medium">
          <CustomTableHead columns={columns} />
          <TableBody>
            {data &&
              data.map((user: any, index: number) => (
                <TableRow key={index} hover>
                  {columns.map((column: Column, index: number) => {
                    if (column.heading !== 'Action') {
                      return (
                        <TableCell
                          sx={{ minWidth: column.minWidth }}
                          key={index}
                        >
                          {user[`${column.value}`]}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell>
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
                    }
                  })}
                </TableRow>
              ))}

            {/* <TableCell>
                <Stack direction={'row'} gap = {1}>
                  <IconButton><DeleteIcon/></IconButton>
                  <IconButton><EditIcon/></IconButton>
                </Stack>
              <TableCell/> */}
          </TableBody>
        </Table>
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

export default CustomTable;
