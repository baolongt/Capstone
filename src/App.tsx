import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/layouts/Layout';
import IncomingDocumentManagement from './pages/incoming-document-management';
import { CreateDocPage } from './components/google-login';
import WrappedEditor from './components/ckedtior/WrappedEditor';

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
          <Route path="poc" element={<CreateDocPage />} />
          <Route path="editor" element={<WrappedEditor />} />
        </Route>
      </Routes>
    </Dashboard>
  );
}

export default App;
