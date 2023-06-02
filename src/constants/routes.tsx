import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
// import SettingsIcon from '@mui/icons-material/Settings';
// import PersonIcon from '@mui/icons-material/Person';
// import { ReactNode } from 'react';
import {
  AdminPanelSettings,
  SettingsApplicationsSharp
} from '@mui/icons-material';
import React from 'react';
import { Path } from '../models/path';
// import { dark } from '@mui/material/styles/createPalette';

const incomingDocumentSubPaths: Path[] = [
  {
    label: 'Sổ văn bản đến',
    path: '/',
    icon: <FolderIcon />
  }
];

const outGoingDocumentSubPaths: Path[] = [
  {
    label: 'Sổ văn bản đi',
    path: '/',
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
    label: 'Cài đặt',
    path: '/setting',
    icon: <SettingsApplicationsSharp />
  }
];
export default paths;
