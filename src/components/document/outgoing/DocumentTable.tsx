import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { HEADER_HEIGHT } from '../../../constants/common';
import TableHeader from './TableHeader';
import { useQuery } from '@tanstack/react-query';
import { getAllOutgoingDocuments } from '../../../api/outgoingDocument';
import { outgoingDocument } from '../../../models';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

const OutGoingDocumentTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: async () => await getAllOutgoingDocuments()
  });
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  return (
    <Box width={'100%'}>
      <TableContainer
        sx={{
          height: `calc(100vh - 32px - 54px - ${HEADER_HEIGHT})`,
          border: '1px solid #ccc'
        }}
      >
        <Table
          stickyHeader
          sx={{ minWidth: '100%', minHeight: '1000px' }}
          size="medium"
        >
          <TableHeader />
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              sx={{ minWidth: '900px', minHeight: '1000px' }}
              height={60}
            />
          ) : (
            <TableBody>
              {data.map((document: Record<string, unknown>, index: number) => (
                <TableRow key={index}>
                  {outgoingDocument.columns.map(
                    (column: outgoingDocument.Column, index: number) => (
                      <TableCell key={index}>
                        {document[`${column.value}`]}
                      </TableCell>
                    )
                  )}
                  <TableCell>
                    <Button variant="text">Xem</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OutGoingDocumentTable;
