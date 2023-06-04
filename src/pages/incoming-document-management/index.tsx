import { Button } from '@mui/material';
import React from 'react';
import DocumentTable from '../../components/document/DocumentTable';
import AddIcon from '@mui/icons-material/Add';
import { NavLink, Route, Routes } from 'react-router-dom';

const IncomingDocumentManagement = () => {
  return (
    <Routes>
      <Route
        index={true}
        element={
          <>
            <Button variant="contained" startIcon={<AddIcon />}>
              <NavLink to="create">Thêm văn bản đến</NavLink>
            </Button>
            <DocumentTable />;
          </>
        }
      />
      <Route index={false} path="create" element={<>test</>} />
    </Routes>
  );
};

export default IncomingDocumentManagement;
