import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { Column, columns } from '../../models/user';

const CustomTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column: Column, index: number) => (
          <TableCell
            sx={{ minWidth: column.minWidth, pl: '8px !important', height: '50px' }}
            key={index}
            align={'left'}
            padding="checkbox"
          >
            {column.heading}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
