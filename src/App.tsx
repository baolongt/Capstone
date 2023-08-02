import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import DashboardLayout from './components/layouts/Layout';
import { Diagram } from './components/poc/Diagram';
import Dashboard from './pages/dashboard';
import DepartmentManagement from './pages/department-management';
import FileManagement from './pages/file-management';
import OutgoingDocumentManagement from './pages/outgoing-document-management';
import CreateOutgoingDocumentPage from './pages/outgoing-document-management/create';
import Setting from './pages/setting';
import TableDemo from './pages/table-base-demo';
import UserManagement from './pages/user-management';

const App = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path={'/'} element={<Dashboard />} />
        <Route path={'/users'} element={<UserManagement />} />
        <Route path={'/departments'} element={<DepartmentManagement />} />
        <Route path={'/documents'} element={<FileManagement />} />
        <Route path={'/setting'} element={<Setting />} />
        <Route path={'/outgoing-documents'}>
          <Route index element={<OutgoingDocumentManagement />} />
          <Route path="create" element={<CreateOutgoingDocumentPage />} />
        </Route>
        <Route path={'/graph'} element={<Diagram />} />
        <Route path={'/table'} element={<TableDemo />} />
      </Routes>
      <ToastContainer
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        rtl={false}
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
