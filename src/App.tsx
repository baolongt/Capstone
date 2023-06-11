import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/layouts/Layout';
import IncomingDocumentManagement from './pages/incoming-document-management';
import { CreateDocPage } from './components/google-login';
import WrappedEditor from './components/ckedtior/WrappedEditor';
import CreateOutgoingDocument from './pages/out-going/create';

const Placeholder: React.FC = () => {
  return (
    <Box
      height="500px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <span>Just me </span>
    </Box>
  );
};

function App() {
  return (
    <Dashboard>
      <Routes>
        <Route path="/">
          <Route index={true} element={<Placeholder />} />
          <Route path="incoming-documents">
            <Route index element={<IncomingDocumentManagement />} />
          </Route>
          <Route path="outgoing-documents">
            <Route index element={<IncomingDocumentManagement />} />
            <Route path="create" element={<CreateOutgoingDocument />} />
          </Route>
          <Route path="poc" element={<CreateDocPage />} />
          <Route path="editor" element={<WrappedEditor />} />
        </Route>
      </Routes>
    </Dashboard>
  );
}

export default App;

/*
văn bản - category - nhà đất, nông nghiệp, điện

lúc đầu 

tp A - nhà đất -> lãnh đạo X 
tp B - nông nghiệp -> lãnh đạo Y 

chuyên viên -> trưởng phòng -> lãnh đạo -> văn thư -> chuyên viên
*/
