import { SelectOption } from '@/types';

import { Attachment } from './attachment';
import { UploadFile } from './uploadFile';

export interface ProcessHisstory {
  id: number;
  handlerName?: string;
  status: number;
  note: string;
  createdAt: string;
  outgoingDocumentId: string;
  handlerId: string;
}
export interface InternalPublishInfo {
  internalNotation: string;
  publishDate: string;
  dueDate: string;
  priority: number;
}
export interface InternalDocument {
  id: number;
  epitomize: string;
  documentField: string;
  createdDate: Date;
  documentTypeId: number;
  documentTypeName: string;
  createdByName: string;
  isRepliedDocument: boolean;
  note: string;
  processDeadline: string;
  attachments: UploadFile[] | Attachment[];
  internalPublishInfo: InternalPublishInfo;
  processHistory: ProcessHisstory[];
}
export interface CreateInternalDocument {
  epitomize: string;
  documentField: string;
  documentTypeId: number;
  isRepliedDocument: boolean;
  note: string;
  processDeadline: string;
  attachments: UploadFile[] | Attachment[];
  internalPublishInfo: InternalPublishInfo;
}

export interface EditInternalDocument {
  epitomize: string;
  documentNotation: string;
  documentField: number;
  documentTypeId: number;
  isRepliedDocument: boolean;
  note: string;
  files: UploadFile[] | Attachment[];
  processDeadline: string;
}

export const convertDetailToEditForm = (
  detail: InternalDocument
): EditInternalDocument => {
  return {
    epitomize: detail.epitomize,
    documentNotation: detail.internalPublishInfo.internalNotation || '',
    documentField: parseInt(detail.documentField),
    documentTypeId: parseInt(String(detail.documentTypeId)),
    isRepliedDocument: detail.isRepliedDocument,
    files: detail.attachments,
    processDeadline: detail.processDeadline,
    note: ''
  };
};

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
export const priorityOptions: Array<SelectOption> = [
  {
    value: 1,
    title: 'Thường'
  },
  {
    value: 2,
    title: 'Hỏa tốc'
  },
  {
    value: 3,
    title: 'Khẩn'
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
