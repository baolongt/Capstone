import { SelectOption } from '@/types';

import { Attachment } from './attachment';
import { UploadFile } from './uploadFile';

export const InternalDocumentStatusDict: Record<number, string> = {
  1: 'Đang xử lý',
  2: 'Đang chỉnh sửa',
  3: 'Đã xử lý'
};

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
  documentStatus: number;
  createdByName: string;
  isRepliedDocument: boolean;
  note: string;
  processDeadline: string;
  attachments: UploadFile[] | Attachment[];
  internalPublishInfo: InternalPublishInfo;
  processHistory: ProcessHisstory[];
  registrationStatus: number;

  createdById: number;
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
