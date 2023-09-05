import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { debounce } from 'lodash';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useListDocuments } from '@/apis';
import {
  DateRange,
  DateRangePickerInput,
  FieldTitle,
  InputSearch
} from '@/components/common';
import { OutgoingDocumentTable } from '@/components/document';
import { DEBOUND_SEARCH_TIME } from '@/constants';
import { BaseTableQueryParams } from '@/types';

const IncomingDocumentManagement = () => {
  const theme = useTheme();
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
        <Box
          sx={{
            bgcolor: theme.palette.secondary.main
          }}
        >
          <Box sx={{ mx: 'auto', width: '1080px' }}>
            <Box sx={{ py: 3 }}>
              <Typography variant="h4">Văn bản đến</Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2
                }}
              >
                <Box>
                  <FieldTitle title="Ngày" />
                  <DateRangePickerInput
                    sx={{ bgcolor: '#fff' }}
                    onChange={handleDateRangeOnChange}
                  />
                </Box>
                <Box mt={4}>
                  <RouterLink to="create">
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<AddIcon />}
                    >
                      Đăng ký văn bản đến
                    </Button>
                  </RouterLink>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mx: 'auto', width: '1080px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 3 }}>
            <InputSearch
              placeholder="Tìm kiếm..."
              onTextChange={debouncedSearch}
            />
          </Box>
          <OutgoingDocumentTable
            metadata={metadata}
            data={data}
            handleChangePage={handleChangePage}
          />
        </Box>
      </Box>
    );
  }
};

export default IncomingDocumentManagement;
