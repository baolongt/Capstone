import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';

import RequireAuth from './components/auth/RequiredAuth';
import { Loading } from './components/common';
import DashboardLayout from './components/layouts/Layout';
import useAuth from './hooks/useAuth';
import { Role } from './models/user';
import Login from './pages/auth/Login';
import Unauthorized from './pages/auth/Unauthorized';
import ContactList from './pages/contact-list';
import Dashboard from './pages/dashboard';
import DepartmentManagement from './pages/department-management';
import FileManagement from './pages/file-management';
import FileDetail from './pages/file-management/detail';
import IncomingDocumentManagement from './pages/incoming-document-management';
import OutgoingDocumentManagement from './pages/outgoing-document-management';
import CreateOutgoingDocumentPage from './pages/outgoing-document-management/create';
import OutgoingDocumentDetail from './pages/outgoing-document-management/detail';
import EditOutgoingDocumentPage from './pages/outgoing-document-management/edit';
import TemplatePage from './pages/template';
import UserManagement from './pages/user-management';

const App = () => {
  const {
    authState: { user }
  } = useAuth();
  return (
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/'} element={<DashboardLayout />}>
        {user && user.roleID === Role.OFFICER ? (
          <Route path={'/dashboard'} element={<Dashboard />} />
        ) : (
          <Route
            path={'/dashboard'}
            element={
              <>
                <Loading />
              </>
            }
          />
        )}
        {/* ADMIN pages */}
        <Route element={<RequireAuth role={Role.ADMIN} />}>
          <Route path={'/users'} element={<UserManagement />} />
          <Route path={'/departments'} element={<DepartmentManagement />} />
        </Route>

        {/* OFFICER pages */}

        <Route element={<RequireAuth role={Role.OFFICER} />}>
          <Route path={'/files'}>
            <Route index element={<FileManagement />} />
            <Route path=":id" element={<FileDetail />} />
          </Route>
          <Route path={'/outgoing-documents'}>
            <Route index element={<OutgoingDocumentManagement />} />
            <Route path="create" element={<CreateOutgoingDocumentPage />} />
            <Route path=":id">
              <Route index element={<OutgoingDocumentDetail />} />
              <Route path="edit" element={<EditOutgoingDocumentPage />} />
            </Route>
          </Route>
          <Route path={'/incoming-documents'}>
            <Route index element={<IncomingDocumentManagement />} />
          </Route>
          <Route path={'/contact-list'}>
            <Route index element={<ContactList />} />
          </Route>
          <Route path={'/template'}>
            <Route index element={<TemplatePage />} />
          </Route>
        </Route>
      </Route>

      <Route path={'/unauthorized'} element={<Unauthorized />} />
    </Routes>
  );
};

export default App;
