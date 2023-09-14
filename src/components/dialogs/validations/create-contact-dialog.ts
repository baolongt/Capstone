import { object, string } from 'yup';

export const schema = object({
  name: string().required(`Tên phòng ban là bắt buộc`),
  organCode: string().required(`Trưởng phòng là bắt buộc`),
  email: string().required(`Trưởng phòng là bắt buộc`),
  phone: string().required(`Trưởng phòng là bắt buộc`)
});
