import { Box } from '@mui/material'
import CustomTable from '../../components/table'
import CustomButton from '../../components/common/button';

import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddUserDialog from '../../components/dialogs/add-user-dialog';
import React from 'react';

const UserManagement = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenDialog = () => setIsOpen(true)
  const handleCloseDialog = () => setIsOpen(false)

  return (
    <Box sx = {{ width: '100%'}}>
      
      <Box sx={{display: 'flex', justifyContent: 'flex-end', mb: '16px'}}>
        <CustomButton
          label='Thêm người dùng'
          icon={<AddIcon/>}
          onClick={handleOpenDialog}
        />
      </Box>

      <CustomTable/>

      <AddUserDialog
        isOpen={isOpen}
        onClose={handleCloseDialog}
      />

    </Box>
  )
}

export default UserManagement