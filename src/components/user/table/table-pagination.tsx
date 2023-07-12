/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, MenuItem, Pagination, Select, TextField } from '@mui/material';
import React from 'react';

interface PaginationProps {
  page: number;
  rowsPerPage: number;
  totalTaskLabel?: string;
  elementsCount: number;
  totalElements: number;
  totalPages: number;
  selected: readonly string[];
  option: number[];

  handleChangePage: (event: any, value: number) => void;

  handleChangeRowsPerPage: (event: any) => void;

  handleChangeGoToPage: (event: any) => void;
}

const UserTablePagination: React.FC<PaginationProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '50px',
        width: '100%',
        fontSize: '14px',
        justifyContent: 'space-between',
        bgcolor: '#fff',
        px: '5px'
      }}
    >
      <Box visibility={props.selected.length === 0 ? 'hidden' : 'visible'}>
        <Box component="span" color="#5B6166">
          Đã chọn:
        </Box>
        <Box component="span" fontWeight={500}>
          {props.selected.length}/{props.totalElements}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Box>
          <Box component="span" color="#5B6166">
            {props.totalTaskLabel}
          </Box>
          <Box component="span" fontWeight={500}>
            Tổng số: {props.totalElements}
          </Box>
        </Box>
        <Pagination
          showFirstButton
          showLastButton
          page={props.page}
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '14px'
            }
          }}
          size="medium"
          count={props.totalPages}
          shape="rounded"
          onChange={(event, value) => props.handleChangePage(event, value)}
        />
        <Select
          value={props.rowsPerPage}
          MenuProps={{
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            },
            transformOrigin: {
              vertical: 'bottom',
              horizontal: 'center'
            }
          }}
          sx={{ width: '120px', height: '30px', fontSize: '14px' }}
          onChange={(event) => props.handleChangeRowsPerPage(event)}
        >
          {props.option.map((item: number, index: number) => (
            <MenuItem key={index} value={item}>
              {item} / Trang
            </MenuItem>
          ))}
        </Select>
        <Box display="flex" alignItems="center" gap="5px">
          <Box component="span" fontSize={14} color="#5B6166">
            Đi tới trang{' '}
          </Box>
          <TextField
            size="small"
            id="outlined-number"
            inputProps={{
              style: {
                height: '10px',
                width: '25px',
                padding: '8.5px 6px'
              }
            }}
            onChange={(event) => props.handleChangeGoToPage(event)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UserTablePagination;
