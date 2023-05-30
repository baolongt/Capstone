import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Editor from './components/ckedtior/WrappedEditor';
import Dashboard from './components/layout/Dashboard';
import { Box } from '@mui/material';
import useCurrentPath from './hooks/useCurrentPath';

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
          <Route index={false} path="editor" element={<Editor />}></Route>
          <Route index={false} path="Index" element={<Placeholder />}></Route>
          <Route index={false} path="Started" element={<Placeholder />}></Route>
          <Route index={false} path="route">
            <Route index={true} element={<>test</>}></Route>
            <Route
              index={false}
              path="editor"
              element={<h1>editor</h1>}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </Dashboard>
  );
}

export default App;
