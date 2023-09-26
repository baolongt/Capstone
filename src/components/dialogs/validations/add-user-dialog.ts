import { number, object, string } from 'yup';

export const schema = object({
  name: string().required(`Tên người dùng là bắt buộc`),
  password: string(),
  email: string().required(`Email là bắt buộc`),
  citizenIdentification: string().required(`CCCD/CMND là bắt buộc`),
  roleID: number().required(`Vai trò là bắt buộc`)
});
