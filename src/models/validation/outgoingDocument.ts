import * as yup from 'yup';

import { UploadFile } from '@/models';

export const createSchema = yup
  .object()
  .shape({
    epitomize: yup
      .string()
      .required('Trích yếu là bắt buộc')
      .trim()
      .min(1)
      .nonNullable(),
    documentField: yup.number().required('Lĩnh vực văn bản là bắt buộc'),
    documentTypeId: yup.number().required('Loại văn bản là bắt buộc'),
    status: yup.number().required('Trạng thái là bắt buộc'),
    note: yup
      .string()
      .required('Ghi chú là bắt buộc')
      .trim()
      .min(1)
      .nonNullable(),
    files: yup
      .array()
      .required('Yêu cầu file đính kèm')
      .min(1, 'Yêu cầu file đính kèm'),
    isRepliedDocument: yup.boolean()
  })
  .required();

export type CreateType = {
  files?: UploadFile[] | undefined;
  isRepliedDocument?: boolean | undefined;
  status: number;
  epitomize: string;
  documentField: number;
  documentTypeId: number;
  note: string;
};

export const detailSchema = yup.object().shape({
  id: yup.number().required(),
  epitomize: yup.string().required(),
  archivedBookName: yup.string().required(),
  outgoingDocumentNumber: yup.number().required(),
  documentNotation: yup.string().required(),
  publishDate: yup.date().required(),
  receiver: yup.string().required(),
  lastSignedBy: yup.string().required(),
  createdByDepartment: yup.string().required(),
  createdBy: yup.string().required(),
  documentField: yup.string().required(),
  documentType: yup.string().required(),
  directingDescription: yup.string().required(),
  processDeadline: yup.date().required(),
  isRepliedDocument: yup.boolean().required(),
  note: yup.string().required(),
  status: yup.string().required(),
  attachments: yup
    .array()
    .required('Yêu cầu file đính kèm')
    .min(1, 'Yêu cầu file đính kèm')
});

export type DetailType = yup.InferType<typeof detailSchema>;
