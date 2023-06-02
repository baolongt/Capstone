import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import DocumentManagement from './pages/document-management';
import UserManagement from './pages/user-management';
import Dashboard from './components/layouts/Layout';
import Setting from './pages/setting';

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
          <Route index={true} element={<Placeholder />}></Route>
          <Route path="documents" element={<DocumentManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </Dashboard>
  );
}

export default App;
