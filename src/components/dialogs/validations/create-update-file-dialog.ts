import { object, string } from 'yup';

export const schema = object({
  title: string().required(`Tiêu đề là bắt buộc`),
  fileNotation: string().required(`Số kí hiệu là bắt buộc`),
  language: string(),
  user: string(),
  description: string(),
  status: string()
});
