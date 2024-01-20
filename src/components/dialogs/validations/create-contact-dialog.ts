import { object, string } from 'yup';

export const schema = object({
  name: string().required(`Tên đơn vị là bắt buộc`),
  organCode: string().required(`Mã đơn vị là bắt buộc`),
  email: string()
    .required(`Email đơn vị là bắt buộc`)
    .email('Email không hợp lệ'),
  phone: string().required(`Số điện thoại là bắt buộc`)
});
