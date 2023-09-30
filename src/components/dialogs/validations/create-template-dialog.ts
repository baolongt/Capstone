import { mixed, object, string } from 'yup';

import { UploadFile } from '@/models';

export const schema = object({
  name: string().required(`Tên văn bản là bắt buộc`),
  file: mixed().required('Yêu cầu file đính kèm')
});
