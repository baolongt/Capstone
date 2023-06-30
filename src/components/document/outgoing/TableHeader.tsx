import { TableCell, TableHead, TableRow } from '@mui/material';
import { outgoingDocument } from '../../../models';
import React from 'react';
import { Column } from '../../../types';

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {outgoingDocument.columns.map(
          (column: Column<outgoingDocument.OutgoingDocument>, index: number) => (
            <TableCell
              sx={{
                minWidth: column.minWidth,
                pl: '16px !important',
                height: '50px'
              }}
              key={index}
              align={'left'}
              padding="checkbox"
            >
              {column.heading}
            </TableCell>
          )
        )}
        <TableCell
          sx={{
            minWidth: '100px',
            pl: '16px !important',
            height: '50px'
          }}
          align={'left'}
          padding="checkbox"
        ></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
