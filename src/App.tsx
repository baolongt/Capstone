import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/dashboard';
import { Route, Routes } from 'react-router-dom';
import UserManagement from './pages/user-management';
import Setting from './pages/setting';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import DashboardLayout from './components/layouts/Layout';
import OutgoingDocumentManagement from './pages/outgoing-document-management';
import CreateOutgoingDocumentPage from './pages/outgoing-document-management/create';

const App = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path={'/'} element={<Dashboard />} />
        <Route path={'/users'} element={<UserManagement />} />
        <Route path={'/setting'} element={<Setting />} />
        <Route path={'/outgoing-documents'}>
          <Route index element={<OutgoingDocumentManagement />} />
          <Route path="create" element={<CreateOutgoingDocumentPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{
          marginBottom: '24px',
          marginLeft: '56px'
        }}
      />
    </DashboardLayout>
  );
};

export default App;
