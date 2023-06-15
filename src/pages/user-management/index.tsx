import { Box } from '@mui/material'
import CustomTable from '../../components/table'
import CustomButton from '../../components/common/button';

import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddUserDialog from '../../components/dialogs/add-user-dialog';
import React from 'react';

const UserManagement = () => {

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  
  const handleOpenCreateDialog = () => setIsCreateDialogOpen(true)
  const handleCloseCreateDialog = () => setIsCreateDialogOpen(false)

  return (
    <Box sx = {{ width: '100%'}}>
      
      <Box sx={{display: 'flex', justifyContent: 'flex-end', mb: '16px'}}>
        <CustomButton
          label='Thêm người dùng'
          icon={<AddIcon/>}
          onClick={handleOpenCreateDialog}
        />
      </Box>

      <CustomTable/>

      <AddUserDialog
        mode = 'create'
        isOpen={isCreateDialogOpen}
        onClose={handleCloseCreateDialog}
      />
    </Box>
  )
}

export default UserManagement