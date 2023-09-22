import { deepPurple, indigo, lightGreen } from '@mui/material/colors';

interface IStatusDict {
  [key: number]: string;
}
export const StatusDict: IStatusDict = {
  0: 'Đang xử lý',
  1: 'Chờ trưởng phòng duyệt',
  2: 'Chờ chánh văn phòng duyệt',
  3: 'Chờ lãnh đạo duyệt',
  4: 'Chờ phát hành',
  5: 'Chờ chỉnh sửa',
  6: 'Đã phát hành'
};

export const StatusCorlorDict: IStatusDict = {
  0: indigo[100],
  1: indigo[200],
  2: indigo[300],
  3: indigo[400],
  4: indigo[500],
  5: indigo[600],
  6: indigo[700]
};
