interface IStatusDict {
  [key: number]: string;
}
export const StatusDict: IStatusDict = {
  0: 'Đang xử lý',
  1: 'Chờ trưởng phòng duyệt',
  2: 'Chờ chánh văn phòng duyệt',
  3: 'Chờ phòng lãnh đạo duyệt',
  4: 'Chờ phát hành',
  5: 'Chờ chỉnh sửa',
  6: 'Đã phát hành'
};

export const StatusCorlorDict: IStatusDict = {
  0: '#e8eaf6',
  1: '#e8eaf6',
  2: '#e8eaf6',
  3: '#e8eaf6',
  4: '#e8eaf6',
  5: '#e8eaf6',
  6: '#e8eaf6'
};
