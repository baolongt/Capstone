import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import DashboardLayout from './components/layouts/Layout';
import { Diagram } from './components/poc/Diagram';
import Dashboard from './pages/dashboard';
import DepartmentManagement from './pages/department-management';
// eslint-disable-next-line import/no-named-as-default
import FilesPage from './pages/files';
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
        <Route path={'/setting'} element={<Setting />} />
        <Route path={'/outgoing-documents'}>
          <Route index element={<OutgoingDocumentManagement />} />
          <Route path="create" element={<CreateOutgoingDocumentPage />} />
        </Route>
        <Route path={'/files'} element={<FilesPage />} />
        <Route path={'/graph'} element={<Diagram />} />
        <Route path={'/table'} element={<TableDemo />} />
      </Routes>
      <ToastContainer
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        rtl={false}
        style={{
          marginTop: '56px',
          marginBottom: '24px',
          marginLeft: '56px'
        }}
      />
    </DashboardLayout>
  );
};

export default App;
