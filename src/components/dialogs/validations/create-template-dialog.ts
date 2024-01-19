import { mixed, object, string } from 'yup';

export const schema = object({
  name: string().required(`Tên văn bản là bắt buộc`),
  description: string().required('Nội dung là bắt buộc'),
  file: mixed().required('Yêu cầu file đính kèm')
});
