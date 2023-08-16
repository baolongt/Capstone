import { Column, SelectOption } from '@/types';

import { UploadFile } from './uploadFile';

export interface OutgoingDocument {
  id: number;
  epitomize: string;
  archivedBookName: string;
  outgoingDocumentNumber: number;
  documentNotation: string;
  publishDate: Date;
  receiver: string;
  lastSignedBy: string;
  createdByDepartment: string;
  createdBy: string;
  documentField: string;
  documentType: string;
  directingDescription: string;
  processDeadline: Date;
  isRepliedDocument: boolean;
  note: string;
  status: string;
  attachments: UploadFile[];
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
