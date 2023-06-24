export interface SelectOption {
  title: string;
  value: number | string;
}

export const roleOptions : SelectOption[] = [
  {
    title: 'Quản trị viên',
    value: 2
  },
  {
    title: 'Công chức',
    value: 1
  }
];
export const jobPositionOptions : SelectOption[] = [
  {
    title: 'Cán bộ',
    value: 1
  },
  {
    title: 'Phó trưởng phòng',
    value: 2
  },
  {
    title: 'Trưởng phòng',
    value: 3
  },
  {
    title: 'Phó vụ trưởng',
    value: 4
  },
  {
    title: 'Phó tổng cục trưởng',
    value: 5
  },
  {
    title: 'Tổng cục trưởng',
    value: 6
  },
  {
    title: 'Lãnh đạo cấp cao',
    value: 7
  }
];