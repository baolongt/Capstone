import { StatusCorlorDict, StatusDict } from '@/constants';
import { DashboardStatus } from '@/models/dashboard-status';

export const convertResponseDataToChartData = (data?: DashboardStatus[]) => {
  if (!data) return [];
  return data.map((item, index) => ({
    id: index,
    value: item.number,
    label: StatusDict[item.status],
    color: StatusCorlorDict[index]
  }));
};

export * from './document-status-pie-chart';
export * from './incoming-status-pie-chart';
export * from './internal-status-pie-chart';
export * from './outgoing-status-pie-chart';
