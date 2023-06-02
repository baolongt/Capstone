import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomTableHead from './table-head'
import axiosInstance from '../../api/axios';
import { Column, columns } from '../../models/user';

const CustomTable = () => {
const [usersData, setUsersData] = useState([]);   

console.log(usersData);
useEffect(() => {
  axiosInstance
  .get('/api/users')
  .then((response:any) => setUsersData(response.data)); 
}, []);
  return (
    <Box width={'100%'}>
      <TableContainer sx={{height: '800px'}}>
        <Table stickyHeader sx = {{minWidth: '900px'}} size = 'small'>
            <CustomTableHead/>
          <TableBody>

            {usersData.length > 0 && usersData?.map((user:any) => (
                <TableRow>
                  {columns.map((column: Column) => (
                    <TableCell>{user[`${column.value}`]}</TableCell>
                  ))}
                </TableRow>
            ))}

            {/* {usersData.length > 0 && (
              <TableRow>
                {columns.map(column: )}
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default CustomTable
