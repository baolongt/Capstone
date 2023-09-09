import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { debounce } from 'lodash';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useListDocuments } from '@/apis';
import {
  DateRange,
  DateRangePickerInput,
  InputSearch
} from '@/components/common';
import { OutgoingDocumentTable } from '@/components/document';
import { DEBOUND_SEARCH_TIME, DEFAULT_PAGE_WIDTH } from '@/constants';
import { BaseTableQueryParams } from '@/types';

const OutgoingDocumentManagement = () => {
  const [queryParams, setQueryParams] = React.useState<BaseTableQueryParams>({
    page: 1,
    size: 10,
    search: ''
  });

  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setQueryParams({ ...queryParams, search: e.target.value });
  };

  const handleDateRangeOnChange = (value: DateRange) => {
    setQueryParams({ ...queryParams, dateRange: value });
  };

  useEffect(() => {
    console.debug('debug value change', queryParams);
  }, [queryParams]);

  const debouncedSearch = debounce(handleChangeSearch, DEBOUND_SEARCH_TIME);

  const { data: response, isLoading } = useListDocuments({
    queryParams
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (response) {
    const { data, metadata } = response;

    return (
      <Box>
        <Box bgcolor="#fff" sx={{ mb: 3 }}>
          <Box sx={{ py: 2, mx: 'auto', width: DEFAULT_PAGE_WIDTH }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2
              }}
            >
              <Typography variant="h4">VĂN BẢN ĐI</Typography>

              <Box>
                <RouterLink to="create">
                  <Button fullWidth variant="contained" startIcon={<AddIcon />}>
                    Đăng ký văn bản đi
                  </Button>
                </RouterLink>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2
              }}
            >
              <Box>
                <InputSearch
                  sx={{ width: '300px', bgcolor: '#fff' }}
                  placeholder="Tìm kiếm..."
                  onTextChange={debouncedSearch}
                />
              </Box>

              <Box>
                <DateRangePickerInput
                  sx={{ width: '300px' }}
                  onChange={handleDateRangeOnChange}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mx: 'auto',
            width: DEFAULT_PAGE_WIDTH
          }}
        >
          <OutgoingDocumentTable
            metadata={metadata}
            data={data}
            handleChangePage={handleChangePage}
            sx={{ minHeight: '30vh' }}
          />
        </Box>
      </Box>
    );
  }
};

export default OutgoingDocumentManagement;
