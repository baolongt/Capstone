import { Button } from '@mui/material';
import React from 'react';
import DocumentTable from '../../components/document/DocumentTable';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';

const IncomingDocumentManagement = () => {
  return (
    <>
      <Button variant="contained" startIcon={<AddIcon />}>
        <NavLink to="create">Thêm văn bản đi</NavLink>
      </Button>
      <DocumentTable />;
    </>
  );
};

export default IncomingDocumentManagement;
