import * as yup from 'yup';

export const schema = yup.object().shape({
  outgoingDocumentId: yup.number().required(),
  outgoingNumber: yup.number().required('Số văn bản là bắt buộc'),
  outgoingNotation: yup.string().required('Ký hiệu văn bản là bắt buộc'),
  contactListIds: yup
    .array()
    .of(yup.number())
    .required('Người nhận là bắt buộc'),
  priority: yup.number().required('Độ ưu tiên là bắt buộc'),
  dueDate: yup.date().required('Hạn xử lý là bắt buộc'),
  issuedAmount: yup.number().required('Số lượng bản phát hành là bắt buộc')
});
