// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { getAllOutgoingDocuments } from '../../../apis/outgoingDocument';
import { HEADER_HEIGHT } from '../../../constants/common';
import { outgoingDocument } from '../../../models';
import { Column } from '../../../types';
import TableHeader from './TableHeader';

const OutGoingDocumentTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => await getAllOutgoingDocuments()
  });

  return (
    <Box width={'100%'}>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          sx={{ minWidth: '900px', minHeight: '1000px' }}
          height={60}
        />
      ) : (
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
            <TableBody>
              {data &&
                data.map((document: Record<string, unknown>, index: number) => (
                  <TableRow key={index}>
                    {outgoingDocument.columns.map(
                      (
                        column: Column<outgoingDocument.OutgoingDocument>,
                        index: number
                      ) => (
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
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default OutGoingDocumentTable;
