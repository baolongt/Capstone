import { number, object } from 'yup';

export const schema = object({
  outGoingDocumentId: number().required(``),
  fileId: number().required(`Tổi thiếu 1 sổ công việc`)
});
