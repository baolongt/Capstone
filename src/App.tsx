import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';

import RequireAuth from './components/auth/RequiredAuth';
import DashboardLayout from './components/layouts/Layout';
import { Role } from './models/user';
import Login from './pages/auth/Login';
import Unauthorized from './pages/auth/Unauthorized';
import Dashboard from './pages/dashboard';
import DepartmentManagement from './pages/department-management';
import FileManagement from './pages/file-management';
import OutgoingDocumentManagement from './pages/outgoing-document-management';
import CreateOutgoingDocumentPage from './pages/outgoing-document-management/create';
import OutgoingDocumentDetail from './pages/outgoing-document-management/detail';
import TestPage from './pages/test';
import UserManagement from './pages/user-management';

const App = () => {
  return (
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/'} element={<DashboardLayout />}>
        <Route path={'/'} element={<Dashboard />} />
        {/* ADMIN pages */}
        <Route element={<RequireAuth role={Role.ADMIN} />}>
          <Route path={'/users'} element={<UserManagement />} />
          <Route path={'/departments'} element={<DepartmentManagement />} />
        </Route>

        {/* OFFICER pages */}

        <Route element={<RequireAuth role={Role.OFFICER} />}>
          <Route path={'/files'} element={<FileManagement />} />
          <Route path={'/test'} element={<TestPage />} />
          <Route path={'/outgoing-documents'}>
            <Route index element={<OutgoingDocumentManagement />} />
            <Route path="create" element={<CreateOutgoingDocumentPage />} />
            <Route path=":id" element={<OutgoingDocumentDetail />} />
          </Route>
        </Route>
      </Route>

      <Route path={'/unauthorized'} element={<Unauthorized />} />
    </Routes>
  );
};

export default App;
