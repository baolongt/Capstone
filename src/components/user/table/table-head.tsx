import { TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import React from 'react';

import { user } from '@/models';
import { Column } from '@/types';

interface UserTableHeadProps {
  columns: Column<user.User>[];
}

const UserTableHead: React.FC<UserTableHeadProps> = ({ columns }) => {
  const theme = useTheme();
  return (
    <TableHead>
      <TableRow>
        {columns.map((column: Column<user.User>, index: number) => (
          <TableCell
            key={index}
            sx={{
              minWidth: column.minWidth,
              height: '50px',
              fontWeight: theme.typography.fontWeightBold
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
