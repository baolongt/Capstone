import React, { useEffect, useState } from 'react';

import { useListStatusIncomingDocument } from '@/apis';
import { DateRange } from '@/components/common';
import {
  convertResponseDataToChartData,
  DocumentStatusPieChart
} from '@/components/dashboard';
import { getOneWeekDateRange } from '@/utils';

const IncomingStatusChart = () => {
  const [DateFilter, setDateFilter] = useState<DateRange>(
    getOneWeekDateRange()
  );
  const { refetch, data, isLoading } =
    useListStatusIncomingDocument(DateFilter);

  const handleOdDateFilterChange = (value: DateRange) => {
    setDateFilter(value);
  };

  useEffect(() => {
    refetch();
  }, [DateFilter, refetch]);

  return (
    <DocumentStatusPieChart
      label="Văn bản đến"
      data={convertResponseDataToChartData(data)}
      sx={{ width: '100%', px: 1, py: 3 }}
      isLoading={isLoading}
      handleDateRangeOnChange={handleOdDateFilterChange}
    />
  );
};

export default IncomingStatusChart;
