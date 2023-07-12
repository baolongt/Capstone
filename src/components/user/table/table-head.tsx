import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

import { user } from '../../../models';
import { Column } from '../../../types';

interface UserTableHeadProps {
  columns: Column<user.User>[];
}

const UserTableHead: React.FC<UserTableHeadProps> = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column: Column<user.User>, index: number) => (
          <TableCell
            key={index}
            sx={{
              minWidth: column.minWidth,
              pl: '16px !important',
              height: '50px'
            }}
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

export default UserTableHead;
