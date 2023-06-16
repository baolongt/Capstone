import { Box, Pagination, Select, MenuItem, TextField } from '@mui/material';
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

const TablePagination = (props: PaginationProps) => {
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
        <Box component='span' color='#5B6166'>
          Đã chọn: 
        </Box>
        <Box component='span' fontWeight={500}>
          {props.selected.length}/{props.totalElements}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Box>
          <Box component='span' color='#5B6166'>
            {props.totalTaskLabel}
          </Box>
          <Box component='span' fontWeight={500}>
            Tổng số: {props.totalElements}
          </Box>
        </Box>
        <Pagination
          page={props.page}
          onChange={(event, value) => props.handleChangePage(event, value)}
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '14px'
            }
          }}
          size='medium'
          count={props.totalPages}
          shape='rounded'
          showFirstButton
          showLastButton
        />
        <Select
          value={props.rowsPerPage}
          onChange={(event) => props.handleChangeRowsPerPage(event)}
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
        >
          {props.option.map((item: number, index: number) => (
            <MenuItem key={index} value={item}>
              {item} / Trang
            </MenuItem>
          ))}
        </Select>
        <Box display='flex' alignItems='center' gap='5px'>
          <Box component='span' fontSize={14} color='#5B6166'>
            Đi tới trang{' '}
          </Box>
          <TextField
            size='small'
            id='outlined-number'
            onChange={(event) => props.handleChangeGoToPage(event)}
            inputProps={{
              style: {
                height: '10px',
                width: '25px',
                padding: '8.5px 6px'
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TablePagination;
