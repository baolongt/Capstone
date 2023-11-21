import { AdminPanelSettings } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FolderIcon from '@mui/icons-material/Folder';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import React from 'react';

import { Path } from '@/types';

// const incomingDocumentSubPaths: Path[] = [
//   {
//     label: 'Sổ văn bản đến',
//     path: '/incoming-documents',
//     icon: <FolderIcon />
//   }
// ];

// const outGoingDocumentSubPaths: Path[] = [
//   {
//     label: 'Sổ văn bản đi',
//     path: '/outgoing-documents',
//     icon: <FolderIcon />
//   }
// ];

export const adminPaths: Path[] = [
  {
    label: 'Trang chủ',
    path: '/dashboard',
    icon: <DashboardIcon />
  },
  {
    label: 'Quản lí loại văn bản',
    path: '/doc-types',
    icon: <ArticleIcon />
  },
  {
    label: 'Quản lí nhân viên',
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
    path: '/dashboard',
    icon: <DashboardIcon />
  },
  {
    label: 'Văn bản đến',
    path: '/incoming-documents',
    icon: <FolderIcon />
  },
  {
    label: 'Văn bản đi',
    path: '/outgoing-documents',
    icon: <FolderIcon />
  },
  {
    label: 'Văn bản nội bộ',
    path: '/internal-documents',
    icon: <FolderIcon />
  },
  {
    label: 'Sổ công việc',
    path: '/files',
    icon: <LibraryBooksIcon />
  },
  {
    label: 'Danh sách liên lạc',
    path: '/contact-list',
    icon: <PeopleIcon />
  },
  {
    label: 'Văn bản mẫu',
    path: '/template',
    icon: <PeopleIcon />
  }
];

type PathDict = {
  [key: string]: string;
};

export const pathDict: PathDict = {
  '/': 'Trang chủ',
  users: 'Quản lí nhân viên',
  departments: 'Quản lí phòng ban',
  'outgoing-documents': 'Văn bản đi',
  'incoming-documents': 'Văn bản đến',
  'internal-documents': 'Văn bản nội bộ',
  files: 'Sổ công việc',
  'contact-list': 'Danh sách liên lạc',
  create: 'Tạo mới',
  edit: 'Chỉnh sửa',
  'add-number': 'Đánh số',
  'edit-workflow': 'Chỉnh sửa trình tự xử lý',
  'edit-publish-info': 'Chỉnh sửa thông tin phát hành',
  template: 'Văn bản mẫu',
  'doc-types': 'Loại văn bản',
  'change-password': 'Đổi mật khẩu'
};
