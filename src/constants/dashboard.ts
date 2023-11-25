interface IStatusDict {
  [key: number]: string;
}
export const StatusDict: IStatusDict = {
  1: 'Đang xử lý',
  2: 'Đang chỉnh sửa',
  3: 'Đã hoàn thành'
};

export enum OutgoingDocumentStatus {
  PENDING = 1,
  EDITING = 2,
  PUBLISHED = 3
}

export const StatusCorlorDict: IStatusDict = {
  0: '#3f51b5',
  1: '#8148b2',
  2: '#b238a4',
  4: '#f21d6f',
  5: '#ff354c',
  6: '#ff5722'
};
