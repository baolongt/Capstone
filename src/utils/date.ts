import dayjs from 'dayjs';

export interface DateRange {
  from: string;
  to: string;
}
export const getOneWeekDateRange = (): DateRange => {
  const from = dayjs().subtract(7, 'day').startOf('day').toISOString();
  const to = dayjs().endOf('day').toISOString();
  return { from, to };
};
