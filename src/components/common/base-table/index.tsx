import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableProps,
  TableRow,
  useTheme
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import React from 'react';

import { Metadata } from '@/types';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box component="div" sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        disabled={page === 0}
        aria-label="first page"
        onClick={handleFirstPageButtonClick}
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        disabled={page === 0}
        aria-label="previous page"
        onClick={handleBackButtonClick}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        onClick={handleNextButtonClick}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        onClick={handleLastPageButtonClick}
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export type BaseTableProps<T> = {
  // table props
  columns: ColumnDef<T, any>[];
  data: T[];
  cellHeight?: number;
  handleCellClick?: (origin: T) => void;

  // paging props
  showPagination?: boolean;
  metadata?: Metadata;
  handleChangePage?: (page: number) => void;
} & TableProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BaseTable: React.FC<BaseTableProps<any>> = (props) => {
  const {
    columns,
    data,
    sx,
    showPagination = true,
    metadata,
    handleChangePage,
    handleCellClick
  } = props;
  const theme = useTheme();

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    if (!metadata) return;

    if (newPage + 1 > metadata.pageNumber && metadata.hasNextPage) {
      handleChangePage?.(newPage + 1);
    }
    if (newPage < metadata.pageNumber && metadata.hasPreviousPage) {
      handleChangePage?.(newPage + 1);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleChangePage?.(1);
  };

  return (
    <Box sx={{ bgcolor: '#fff', p: 1, borderRadius: '8px' }}>
      <Table
        stickyHeader
        {...props}
        sx={{ width: '100%', ...sx }}
        size="medium"
      >
        <TableHead>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableCell
                    key={header.id}
                    padding="checkbox"
                    sx={{
                      color: theme.palette.primary.main,
                      height: '50px',
                      fontWeight: theme.typography.fontWeightBold,
                      width: header.getSize()
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {getRowModel().rows.map((row) => (
            <TableRow key={row.id} style={{ height: '50px' }}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{ height: '52px', padding: '0px 4px' }}
                  onClick={() => {
                    console.log('cell', cell);
                    handleCellClick?.(cell.row.original);
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {showPagination &&
            metadata &&
            !metadata.hasNextPage &&
            data.length < metadata.pageSize &&
            Array(metadata.pageSize - data.length)
              .fill('')
              .map((row, index) => (
                <TableRow key={index} style={{ height: '52px' }}></TableRow>
              ))}
        </TableBody>
        {showPagination && metadata && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, { label: 'All', value: -1 }]}
                count={metadata.totalItemCount}
                rowsPerPage={metadata.pageSize}
                page={metadata.pageNumber - 1}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page'
                  },
                  native: true
                }}
                style={{ width: '100%' }}
                ActionsComponent={TablePaginationActions}
                onPageChange={onPageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </Box>
  );
};

export default BaseTable;
