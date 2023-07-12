import { number, object, string } from 'yup';

export const schema = object({
  name: string().required(`Tên phòng ban là bắt buộc`),
  departmentLeaderID: number().required(`Trưởng phòng là bắt buộc`)
});
