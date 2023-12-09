import { OutgoingDocumentStatus } from '@/constants';
import { SelectOption } from '@/types';

import { Attachment } from './attachment';
import { UploadFile } from './uploadFile';

export interface OutgoingDocument {
  id: number;
  epitomize: string;
  archivedBookName: string;
  outgoingDocumentNumber: number;
  documentNotation: string;
  publishDate: string;
  receiver: string;
  lastSignedBy: string;
  createdByDepartment: string;
  documentStatus: OutgoingDocumentStatus;
  createdBy: string;
  documentField: string;
  documentType: string;
  documentTypeId: string;
  directingDescription: string;
  processDeadline: string;
  isRepliedDocument: boolean;
  note: string;
  status: string;
  attachments: UploadFile[] | Attachment[];
  processHistory: ProcessHisstory[];
  createdByName: string;
  documentTypeName: string;
  createdDate: string;
  updatedDate: string;
  registrationStatus: number;
  outgoingPublishInfo?: OutgoingPublishInfo;
  createdById: number;
}

export interface ProcessHisstory {
  id: number;
  handlerId: string;
  createdAt: string;
  outgoingDocumentId: string;
  status: number;
  note: string;
  handlerName?: string;
}

export interface OutgoingPublishInfo {
  outgoingDocumentId: number;
  outgoingNumber: number;
  outgoingNotation: string;
  priority: number;
  issuedAmount: number;
  dueDate: string;
  contactLists: ContactList[];
}

export interface ContactList {
  id: number;
  name: string;
  organCode: string;
  email: string;
  phone: string;
}

export interface CreateOutgoingDocument {
  epitomize: string;
  documentField: number;
  documentTypeId: number;
  isRepliedDocument: boolean;
  status: number;
  files: UploadFile[];
}

export interface EditOutgoingDocument {
  epitomize: string;
  documentNotation: string;
  documentField: number;
  documentTypeId: number;
  isRepliedDocument: boolean;
  status: string;
  files: UploadFile[] | Attachment[];
  processDeadline: string;
}

export const convertDetailToEditForm = (
  detail: OutgoingDocument
): EditOutgoingDocument => {
  return {
    epitomize: detail.epitomize,
    documentNotation: detail.documentNotation || '',
    documentField: parseInt(detail.documentField),
    documentTypeId: parseInt(detail.documentTypeId),
    isRepliedDocument: detail.isRepliedDocument,
    status: detail.status,
    files: detail.attachments,
    processDeadline: detail.processDeadline
  };
};

export const DocumentStatusDict = new Map<number, string>([
  [1, 'Đang xử lý'],
  [2, 'Đang chỉnh sửa'],
  [3, 'Đã phát hành']
]);

export interface ForwardOutgoingDocument {
  documentId: number;
  newStatus: number;
  newHandlerId: number;
  newNote: string;
}

export const documentFieldOptions: Array<SelectOption> = [
  {
    value: 1,
    title: 'Hành chính văn phòng'
  },
  {
    value: 2,
    title: 'Nhân sự'
  },
  {
    value: 3,
    title: 'Hoạt động kinh doanh'
  },
  {
    value: 4,
    title: 'Tài chính, kế toán'
  }
];

export const documentTypeOptionsMap: Record<number, Array<SelectOption>> = {
  1: [
    {
      value: 1,
      title: 'Công văn'
    },
    {
      value: 2,
      title: 'Tài liệu'
    },
    {
      value: 3,
      title: 'Báo cáo'
    },
    {
      value: 4,
      title: 'Hồ sơ thành lập'
    }
  ],
  2: [
    {
      value: 5,
      title: 'Quyết định'
    },
    {
      value: 6,
      title: 'Hồ sơ nhân viên'
    },
    {
      value: 7,
      title: 'Bảo hiểm xã hội'
    }
  ],
  3: [
    {
      value: 8,
      title: 'Hợp đồng'
    }
  ],
  4: [
    {
      value: 9,
      title: 'Dự toán'
    },
    {
      value: 10,
      title: 'Kế hoạch'
    },
    {
      value: 11,
      title: 'Kiểm kê'
    }
  ]
};

export const statusOptions: Array<SelectOption> = [
  {
    value: 1,
    title: 'Đang xử lý'
  },
  {
    value: 2,
    title: 'Đã xử lý'
  }
];

export type ShareList = {
  departmentId: number;
  departmentName: string;
  users: {
    userId: number;
    userName: string;
    userEmail: string;
  }[];
}[];
