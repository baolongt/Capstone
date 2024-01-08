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
    // status: yup.number().required('Trạng thái là bắt buộc'),
    processDeadline: yup.string().required('Hạn xử lý là bắt buộc'),
    files: yup
      .array()
      .required('Yêu cầu file đính kèm')
      .min(1, 'Yêu cầu file đính kèm'),
    incomingNotation: yup.string().required('Số hiệu là bắt buộc').trim(),
    // publishDate: yup.string().required('Hạn xử lý là bắt buộc'),
    // dueDate: yup.string().required('Hạn xử lý là bắt buộc'),
    priority: yup.number().required('Độ ưu tiên là bắt buộc')
  })
  .required();

export type CreateType = {
  epitomize: string;
  documentField: number;
  documentTypeId: number;
  processDeadline: string;
  files?: UploadFile[] | undefined;
  incomingNotation: string;
  // dueDate: string;
  priority: number;
  // isRepliedDocument: boolean;
};

export const editSchema = yup.object().shape({
  epitomize: yup
    .string()
    .required('Trích yếu là bắt buộc')
    .trim()
    .min(1)
    .nonNullable(),
  documentField: yup.number().required('Lĩnh vực văn bản là bắt buộc'),
  documentTypeId: yup.number().required('Loại văn bản là bắt buộc'),
  processDeadline: yup.string().required('Hạn xử lý là bắt buộc'),
  documentNotation: yup.string().required('Ký hiêu văn bản là bắt buộc'),
  files: yup
    .array()
    .required('Yêu cầu file đính kèm')
    .min(1, 'Yêu cầu file đính kèm')
});

export const forwardSchema = yup.object().shape({
  documentId: yup.number().required(),
  newStatus: yup.number().required(),
  newHandlerId: yup.number().required(),
  newNote: yup.string().required()
});
export type ForwardType = yup.InferType<typeof forwardSchema>;

export type EditType = yup.InferType<typeof editSchema>;
