import { Status } from '@/models/work-flow';

export const StatusColor: Record<Status, string> = {
  1: '#ffe082',
  2: '#a5d6a7',
  3: '#ef9a9a',
  4: '#fff'
};

export const StatusLabel: Record<Status, string> = {
  1: 'Chờ xử lý',
  2: 'Đã hoàn thành',
  3: 'Từ chối',
  [Status.NOT_START]: ''
};
