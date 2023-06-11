import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import CustomTableHead from './table-head';
import { Column, columns } from '../../models/user';
import { HEADER_HEIGHT } from '../../constants/common';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../api/admin';
import React from 'react';

const CustomTable = () => {
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
                <TableRow key={index}>
                  {columns.map((column: Column, index: number) => (
                    <TableCell key={index}>{user[`${column.value}`]}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomTable;
