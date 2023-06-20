import { object, string, number } from 'yup';

export const validationSchema = object().shape({
  epitomize: string().required('Trích yếu là bắt buộc'),
  documentFieldId: number().required('Lĩnh vực văn bản là bắt buộc'),
  documentTypeId: number().required('Loại văn bản là bắt buộc'),
  note: string().required('Ghi chú là bắt buộc')
});
