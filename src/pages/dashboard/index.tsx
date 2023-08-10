import { Box, Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const handleSuccessClick = () => {
    toast.success('Success message');
  };

  const handleErrorClick = () => {
    toast.error('Error message');
  };

  const handleInfoClick = () => {
    toast.info('Info message');
  };

  return (
    <Box component="div" sx={{ width: '100%' }}>
      <Button onClick={handleSuccessClick}>Show success toast</Button>
      <Button onClick={handleErrorClick}>Show error toast</Button>
      <Button onClick={handleInfoClick}>Show info toast</Button>
    </Box>
  );
};

export default Dashboard;
