import React, { useEffect, useState } from 'react';

import { useListStatusOutgoingDocument } from '@/apis';
import { DateRange } from '@/components/common';
import {
  convertResponseDataToChartData,
  DocumentStatusPieChart
} from '@/components/dashboard';
import { getOneWeekDateRange } from '@/utils';

const OutgoingStatusChart = () => {
  const [odDateFilter, setOdDateFilter] = useState<DateRange>(
    getOneWeekDateRange()
  );
  const {
    refetch: refetchOd,
    data: odData,
    isLoading: odLoading
  } = useListStatusOutgoingDocument(odDateFilter);

  const handleOdDateFilterChange = (value: DateRange) => {
    setOdDateFilter(value);
  };

  useEffect(() => {
    refetchOd();
  }, [odDateFilter, refetchOd]);

  return (
    <DocumentStatusPieChart
      label="Thống kê văn bản đi"
      data={convertResponseDataToChartData(odData)}
      sx={{ width: '60%', p: 3 }}
      isLoading={odLoading}
      handleDateRangeOnChange={handleOdDateFilterChange}
    />
  );
};

export default OutgoingStatusChart;
