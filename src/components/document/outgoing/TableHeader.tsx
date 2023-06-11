import { TableCell, TableHead, TableRow } from '@mui/material';
import { outgoingDocument } from '../../../models';
import React from 'react';

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {outgoingDocument.columns.map(
          (column: outgoingDocument.Column, index: number) => (
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
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
