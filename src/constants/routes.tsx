import { AdminPanelSettings } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FolderIcon from '@mui/icons-material/Folder';
import React from 'react';

import { Path } from '@/types';

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

export const adminPaths: Path[] = [
  {
    label: 'Trang chủ',
    path: '/',
    icon: <DashboardIcon />
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
  }
];

export const officerPaths: Path[] = [
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
    label: 'Sổ công việc',
    path: '/files',
    icon: <FolderIcon />
  },
  {
    label: 'Danh sách liên lạc',
    path: '/contact-list',
    icon: <FolderIcon />
  }
];

type PathDict = {
  [key: string]: string;
};

export const pathDict: PathDict = {
  '/': 'Trang chủ',
  users: 'Quản lí người dùng',
  departments: 'Quản lí phòng ban',
  'outgoing-documents': 'Văn bản đi',
  files: 'Sổ công việc',
  'contact-list': 'Danh sách liên lạc'
};
