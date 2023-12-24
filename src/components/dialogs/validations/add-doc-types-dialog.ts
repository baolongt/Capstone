import { number, object, string } from 'yup';

export const schema = object({
  name: string().required(`Tên loại văn bản không được để trống`),
  description: string().required(`Mô tả không được để trống`),
  field: number().required(`Lĩnh vực không được để trống`)
});
