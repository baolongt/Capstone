import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import { debounce } from 'lodash';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useListInternalDocuments } from '@/apis/internalDocument';
import {
  DateRange,
  DateRangePickerInput,
  InputSearch
} from '@/components/common';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import { InternalDocumentTable } from '@/components/document/internal/internal-doc-table';
import { DEBOUND_SEARCH_TIME, DEFAULT_PAGE_WIDTH } from '@/constants';
import { BaseTableQueryParams } from '@/types';

const InternalDocumentManagement = () => {
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

  const debouncedSearch = debounce(handleChangeSearch, DEBOUND_SEARCH_TIME);

  const { data: response, isLoading } = useListInternalDocuments({
    queryParams
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (response) {
    const { data, metadata } = response;

    return (
      <Box>
        <PageHeader>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <PageTitle label="văn bản nội bộ" />

            <Box>
              <RouterLink to="create">
                <Button fullWidth variant="contained" startIcon={<AddIcon />}>
                  Thêm vản bản nội bộ
                </Button>
              </RouterLink>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1
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
        </PageHeader>
        <Box
          sx={{
            mx: 'auto',
            width: DEFAULT_PAGE_WIDTH
          }}
        >
          <InternalDocumentTable
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

export default InternalDocumentManagement;