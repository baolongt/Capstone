import * as yup from 'yup';

export const validationSchema = yup
  .object()
  .shape({
    epitomize: yup
      .string()
      .required('Trích yếu là bắt buộc')
      .trim()
      .min(1)
      .nonNullable(),
    documentFieldId: yup.number().required('Lĩnh vực văn bản là bắt buộc'),
    documentTypeId: yup.number().required('Loại văn bản là bắt buộc'),
    status: yup.number().required('Trạng thái là bắt buộc'),
    note: yup
      .string()
      .required('Ghi chú là bắt buộc')
      .trim()
      .min(1)
      .nonNullable()
  })
  .required();
