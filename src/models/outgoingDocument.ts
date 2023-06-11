export interface Column {
  heading: string;
  minWidth?: string;
  type?: string;
  value: string;
}

export const columns: Column[] = [
  {
    heading: 'Trích yếu',
    value: 'epitomize',
    minWidth: '30px'
  },
  {
    heading: 'Ký hiệu văn bản',
    value: 'documentNotation',
    minWidth: '100px'
  },
  {
    heading: 'Nơi nhận',
    value: 'receiver',
    minWidth: '100px'
  },
  {
    heading: 'Ngày phát hành',
    value: 'publishDate',
    type: 'date',
    minWidth: '100px'
  },
  {
    heading: 'Loại văn bản',
    value: 'documentType',
    minWidth: '100px'
  }
];

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
  directingDescription: string;
  processDeadline: Date;
  isRepliedDocument: boolean;
  note: string;
}

export interface CreateOutgoingDocument {
  epitomize: string;
  createdByDepartment: string;
  createdBy: string;
  documentFieldId: number;
  documentTypeId: number;
  note: string;
}
