import { number, object, string } from 'yup';

export const schema = object({
  description: string().required(`Mô tả không được để trống`),
  field: number().required(`Lĩnh vực không được để trống`)
});
