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
  0: '#3f51b5',
  1: '#8148b2',
  2: '#b238a4',
  3: '#d8248d',
  4: '#f21d6f',
  5: '#ff354c',
  6: '#ff5722'
};
