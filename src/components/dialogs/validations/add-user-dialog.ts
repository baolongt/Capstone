import { number, object, string } from 'yup';

export const schema = object({
  name: string().required(`Tên nhân viên là bắt buộc`),
  email: string().required(`Email là bắt buộc`),
  citizenIdentification: string().required(`CCCD/CMND là bắt buộc`),
  roleID: number().required(`Vai trò là bắt buộc`)
});
