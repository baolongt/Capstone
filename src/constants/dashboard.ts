interface IStatusDict {
  [key: number]: string;
}
export const StatusDict: IStatusDict = {
  0: 'Đang xử lý',
  1: 'Chờ trưởng phòng duyệt',
  2: 'Chờ lãnh đạo duyệt',
  3: 'Chờ văn thư lấy số',
  4: 'Chờ lãnh đạo ký',
  5: 'Chờ chỉnh sửa',
  6: 'Đã phát hành'
};

export enum OutgoingDocumentStatus {
  DANG_XU_LY = 0,
  CHO_TRUONG_PHONG_DUYET = 1,
  CHO_LANH_DAO_DUYET = 2,
  CHO_VAN_THU_LAY_SO = 3,
  CHO_LANH_DAO_KY = 4,
  CHO_CHINH_SUA = 5,
  DA_PHAT_HANH = 6
}

export const StatusCorlorDict: IStatusDict = {
  0: '#3f51b5',
  1: '#8148b2',
  2: '#b238a4',
  3: '#d8248d',
  4: '#f21d6f',
  5: '#ff354c',
  6: '#ff5722'
};
