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
import { Column, UpdateUserPayload, columns } from '../../models/user';
import { HEADER_HEIGHT } from '../../constants/common';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../api/admin';
import React, { useState } from 'react';
import AddUserDialog from '../dialogs/add-user-dialog';

const CustomTable = () => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [currentUser, setCurentUser] = useState<UpdateUserPayload | undefined>(null);

  const handleOpenUpdateDialog = () => setIsUpdateDialogOpen(true);
  const handleCloseUpdateDialog = () => setIsUpdateDialogOpen(false);

  const handleUpateUser = (user: UpdateUserPayload) => {
    setCurentUser(user);
    handleOpenUpdateDialog();
  };

  const { data, isLoading } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: async () => await getAllUsers()
  });

  return (
    <Box width={'100%'}>
      <TableContainer
        sx={{
          height: `calc(100vh - 32px - 54px - ${HEADER_HEIGHT})`,
          border: '1px solid #ccc'
        }}
      >
        <Table stickyHeader sx={{ minWidth: '900px' }} size="medium">
          <CustomTableHead />
          <TableBody>
            {!isLoading &&
              data?.data.map((user: any, index: number) => (
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
                            <IconButton>
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
      </TableContainer>
      <AddUserDialog
        userProfile={currentUser}
        mode="update"
        isOpen={isUpdateDialogOpen}
        onClose={handleCloseUpdateDialog}
      />
    </Box>
  );
};

export default CustomTable;
