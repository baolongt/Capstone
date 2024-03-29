import 'react-toastify/dist/ReactToastify.css';
import './App.css';

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
import DocumentTypeManagement from './pages/doc-types-management';
import FileManagement from './pages/file-management';
import FileDetail from './pages/file-management/detail';
import IncomingDocumentManagement from './pages/incoming-document-management';
import IncomingCreateStepsPage from './pages/incoming-document-management/create-steps';
import IncomingDocumentDetail from './pages/incoming-document-management/detail';
import EditIncomingDocumentPage from './pages/incoming-document-management/edit';
import IncomingDocEditWorkFlowPage from './pages/incoming-document-management/edit-workflow';
import InternalDocumentManagement from './pages/internal-document-management';
import InternalCreateStepsPage from './pages/internal-document-management/create-steps';
import InternalDocumentDetail from './pages/internal-document-management/detail';
import EditInternalDocumentPage from './pages/internal-document-management/edit';
import InternalDocEditWorkFlowPage from './pages/internal-document-management/edit-workflow';
import OutgoingDocumentManagement from './pages/outgoing-document-management';
import AddNumberPage from './pages/outgoing-document-management/add-number';
import CreateStepsPage from './pages/outgoing-document-management/create-steps';
import OutgoingDocumentDetail from './pages/outgoing-document-management/detail';
import EditOutgoingDocumentPage from './pages/outgoing-document-management/edit';
import OutgoingEditPublishInfoPage from './pages/outgoing-document-management/edit-publish-info';
import OutgoingDocEditWorkFlowPage from './pages/outgoing-document-management/edit-workflow';
import PrepareEmailPage from './pages/outgoing-document-management/prepare-email';
import Profile from './pages/profile';
import ChangePasswordPage from './pages/profile/change-password';
import TemplatePage from './pages/template';
import TestPage from './pages/test';
import UserManagement from './pages/user-management';

const App = () => {
  const {
    authState: { user }
  } = useAuth();
  return (
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/test'} element={<TestPage />} />
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
        {user && (
          <>
            <Route path={'/profile'}>
              <Route index element={<Profile />} />
            </Route>
            <Route path={'/change-password'}>
              <Route index element={<ChangePasswordPage />} />
            </Route>
          </>
        )}

        {/* ADMIN pages */}
        <Route element={<RequireAuth role={Role.ADMIN} />}>
          <Route path={'/users'} element={<UserManagement />} />
          <Route path={'/departments'} element={<DepartmentManagement />} />
          <Route path={'/doc-types'} element={<DocumentTypeManagement />} />
        </Route>

        {/* OFFICER pages */}

        <Route element={<RequireAuth role={Role.OFFICER} />}>
          <Route path={'/files'}>
            <Route index element={<FileManagement />} />
            <Route path=":id" element={<FileDetail />} />
          </Route>
          <Route path={'/outgoing-documents'}>
            <Route index element={<OutgoingDocumentManagement />} />
            <Route path="create" element={<CreateStepsPage />} />
            <Route path=":id">
              <Route index element={<OutgoingDocumentDetail />} />
              <Route path="prepare-email" element={<PrepareEmailPage />} />
              <Route path="edit" element={<EditOutgoingDocumentPage />} />
              <Route
                path="edit-workflow"
                element={<OutgoingDocEditWorkFlowPage />}
              />
              <Route
                path="edit-publish-info"
                element={<OutgoingEditPublishInfoPage />}
              />
              <Route path="add-number" element={<AddNumberPage />} />
            </Route>
          </Route>
          <Route path={'/incoming-documents'}>
            <Route index element={<IncomingDocumentManagement />} />
            <Route path="create" element={<IncomingCreateStepsPage />} />
            <Route path=":id">
              <Route index element={<IncomingDocumentDetail />} />
              <Route path="edit" element={<EditIncomingDocumentPage />} />
              <Route
                path="edit-workflow"
                element={<IncomingDocEditWorkFlowPage />}
              />
            </Route>
          </Route>
          <Route path={'/internal-documents'}>
            <Route index element={<InternalDocumentManagement />} />
            <Route path="create" element={<InternalCreateStepsPage />} />
            <Route path=":id">
              <Route index element={<InternalDocumentDetail />} />
              <Route path="edit" element={<EditInternalDocumentPage />} />
              <Route
                path="edit-workflow"
                element={<InternalDocEditWorkFlowPage />}
              />
            </Route>
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
