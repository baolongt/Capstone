import * as yup from 'yup';

export const schema = yup.object().shape({
  documentId: yup.number().required(),
  publishNumber: yup.number().required(),
  documentNotation: yup.string().required('Ký hiệu văn bản là bắt buộc'),
  description: yup.string().required('Mô tả là bắt buộc'),
  contactIds: yup.array().of(yup.number()).required('Người nhận là bắt buộc'),
  priority: yup.number().required('Độ ưu tiên là bắt buộc'),
  dueDate: yup.date().required('Hạn xử lý là bắt buộc')
});
