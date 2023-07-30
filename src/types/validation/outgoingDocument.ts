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
    files: yup.array(),
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
