import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import {
  AdminPanelSettings,
  SettingsApplicationsSharp
} from '@mui/icons-material';
import React from 'react';
import { Path } from '../types';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const incomingDocumentSubPaths: Path[] = [
  {
    label: 'Sổ văn bản đến',
    path: '/incoming-documents',
    icon: <FolderIcon />
  }
];

const outGoingDocumentSubPaths: Path[] = [
  {
    label: 'Sổ văn bản đi',
    path: '/outgoing-documents',
    icon: <FolderIcon />
  }
];

const paths: Path[] = [
  {
    label: 'Trang chủ',
    path: '/',
    icon: <DashboardIcon />
  },
  {
    label: 'Văn bản đến',
    path: '/documents',
    icon: <FolderIcon />,
    subPaths: incomingDocumentSubPaths
  },
  {
    label: 'Văn bản đi',
    path: '/documents',
    icon: <FolderIcon />,
    subPaths: outGoingDocumentSubPaths
  },
  {
    label: 'Quản lí người dùng',
    path: '/users',
    icon: <AdminPanelSettings />
  },
  {
    label: 'Quản lí phòng ban',
    path: '/departments',
    icon: <Diversity3Icon />
  },
  {
    label: 'Edtior-demo',
    path: '/editor',
    icon: <SettingsApplicationsSharp />
  },
  {
    label: 'Create doc demo',
    path: '/poc',
    icon: <SettingsApplicationsSharp />
  }
];
export default paths;
