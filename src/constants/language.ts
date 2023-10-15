import { SelectOption } from '@/types';

export const languageOptions: SelectOption[] = [
  {
    title: 'Tiếng Việt',
    value: 'vi'
  },
  {
    title: 'English',
    value: 'en'
  }
];

export const statusOptions: SelectOption[] = [
  {
    title: 'Đóng sổ',
    value: 'inactive'
  },
  {
    title: 'Mở sở',
    value: 'active'
  }
];

export const priorityOptions: SelectOption[] = [
  {
    title: 'Thường',
    value: 1
  },
  {
    title: 'Hoả tốc',
    value: 2
  },
  {
    title: 'Khẩn cấp',
    value: 3
  }
];
