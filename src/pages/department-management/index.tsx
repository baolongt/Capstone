import { Box } from '@mui/material';
import React from 'react';
import CustomTable from '../../components/table';
import { Column } from '../../models/user';
import { mock_data } from '../../models/department';
import { HEADER_HEIGHT } from '../../constants/common';

const DepartmentManagement = () => {
  const columns: Column[] = [
    {
      heading: '#',
      minWidth: '30px',
      type: 'text',
      value: 'id',
    },
    {
      heading: 'Tên phòng ban',
      minWidth: '150px',
      type: 'text',
      value: 'name',
    },
    {
      heading: 'Trưởng phòng',
      minWidth: '150px',
      type: 'text',
      value: 'leader',
    }
  ];
  return (
    <Box>
    <CustomTable height={`calc(100vh - 54px - 50px - ${HEADER_HEIGHT})`}
      data={mock_data}
      columns={columns}  
      dataPagination={{}}
      onChangePage={()=>{}}
      onChangeSize={()=>{}}
    />
  </Box>
  );
};

export default DepartmentManagement;
