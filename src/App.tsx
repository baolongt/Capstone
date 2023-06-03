import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/layouts/Layout';
import IncomingDocumentManagement from './pages/incoming-document-management';

const Placeholder: React.FC = () => {
  return (
    <Box
      height="500px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <span>Just me here </span>
    </Box>
  );
};

function App() {
  return (
    <Dashboard>
      <Routes>
        <Route path="/">
          <Route index={true} element={<Placeholder />} />
          <Route
            index={false}
            path="incoming-documents"
            element={<IncomingDocumentManagement />}
          />
        </Route>
      </Routes>
    </Dashboard>
  );
}

export default App;
