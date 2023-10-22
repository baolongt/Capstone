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
  outgoingPublishInfo?: OutgoingPublishInfo;
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
  note: string;
  files: UploadFile[];
}

export interface EditOutgoingDocument {
  epitomize: string;
  documentNotation: string;
  documentField: number;
  documentTypeId: number;
  isRepliedDocument: boolean;
  status: string;
  note: string;
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
    processDeadline: detail.processDeadline,
    note: ''
  };
};

export enum DocumentStatus {
  CHUYEN_TOI_TRUONG_PHONG = 1,
  CHUYEN_TOI_CHANH_VAN_PHONG,
  CHUYEN_TOI_LANH_DAO,
  CHUYEN_TOI_VAN_THU,
  TRA_LAI,
  BAN_HANH_VAN_BAN
}

export const DocumentStatusDict = new Map<number, string>([
  [0, 'Chưa chuyển'],
  [1, 'Đang xử lý'],
  [2, 'Đang xử lý'],
  [3, 'Đang xử lý'],
  [4, 'Chờ ban hành'],
  [5, 'Chờ chỉnh sửa'],
  [6, 'Vản bản đã ban hành']
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
    title: 'Văn bản hành chính'
  },
  {
    value: 2,
    title: 'Văn bản chuyên ngành'
  }
];

export const documentTypeOptionsMap: Record<number, Array<SelectOption>> = {
  1: [
    {
      value: 1,
      title: 'Nghị quyết (cá biệt)'
    },
    {
      value: 2,
      title: 'Quyết định (cá biệt)'
    },
    {
      value: 3,
      title: 'Chỉ thị'
    },
    {
      value: 4,
      title: 'Quy chế'
    },
    {
      value: 5,
      title: 'Quy định'
    },
    {
      value: 6,
      title: 'Thông cáo'
    },
    {
      value: 7,
      title: 'Thông báo'
    },
    {
      value: 8,
      title: 'Hướng dẫn'
    },
    {
      value: 9,
      title: 'Chương trình'
    },
    {
      value: 10,
      title: 'Kế hoạch'
    },
    {
      value: 11,
      title: 'Phương án'
    },
    {
      value: 12,
      title: 'Đề án'
    },
    {
      value: 13,
      title: 'Dự án'
    },
    {
      value: 14,
      title: 'Báo cáo'
    },
    {
      value: 15,
      title: 'Biên bản'
    },
    {
      value: 16,
      title: 'Tờ trình'
    },
    {
      value: 17,
      title: 'Hợp đồng'
    },
    {
      value: 18,
      title: 'Công văn'
    },
    {
      value: 19,
      title: 'Công điện'
    },
    {
      value: 20,
      title: 'Bản ghi nhớ'
    },
    {
      value: 21,
      title: 'Bản thỏa thuận'
    },
    {
      value: 22,
      title: 'Giấy ủy quyền'
    },
    {
      value: 23,
      title: 'Giấy mời'
    },
    {
      value: 24,
      title: 'Giấy giới thiệu'
    },
    {
      value: 25,
      title: 'Giấy nghỉ phép'
    },
    {
      value: 26,
      title: 'Phiếu gửi'
    },
    {
      value: 27,
      title: 'Phiếu chuyển'
    },
    {
      value: 28,
      title: 'Phiếu báo'
    },
    {
      value: 29,
      title: 'Thư công'
    }
  ],
  2: []
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
