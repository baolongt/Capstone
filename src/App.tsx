import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Editor from './components/ckedtior/WrappedEditor';
import Dashboard from './components/layout/Dashboard';
import { Box } from '@mui/material';
import useCurrentPath from './hooks/useCurrentPath';
import CreateDocumentForm from './components/document/CreateDocumentForm';
import DocumentTable from './components/document/DocumentTable';

const Placeholder: React.FC = () => {
  const path = useCurrentPath();
  return (
    <Box
      height="500px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <span>This is path {path}</span>
    </Box>
  );
};

function App() {
  return (
    <Dashboard>
      <Routes>
        <Route path="/">
          <Route index={true} element={<Placeholder />}></Route>
          <Route path="editor" element={<Editor />}></Route>
          <Route path="document" element={<DocumentTable />}></Route>
          <Route
            index={false}
            path="create-document"
            element={<CreateDocumentForm />}
          ></Route>
        </Route>
      </Routes>
    </Dashboard>
  );
}

export default App;
