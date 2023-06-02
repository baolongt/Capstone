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
const paths: Path[] = [
  {
    label: 'Trang chủ',
    path: '/',
    icon: <DashboardIcon />
  },
  {
    label: 'Tài liệu',
    path: '/documents',
    icon: <FolderIcon />
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
