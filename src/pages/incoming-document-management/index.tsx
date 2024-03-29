import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { debounce } from 'lodash';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useListIncomingDocuments } from '@/apis/incomingDocument/listDocuments';
import {
  DateRange,
  DateRangePickerInput,
  InputSearch,
  Loading
} from '@/components/common';
import PageHeader from '@/components/common/page-header';
import PageTitle from '@/components/common/page-title';
import { IncomingDocumentTable } from '@/components/document/incoming/incoming-doc-table';
import { DEBOUND_SEARCH_TIME, DEFAULT_PAGE_WIDTH } from '@/constants';
import { BaseTableQueryParams, StatusFilter } from '@/types';

const IncomingDocumentManagement = () => {
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

  const handleStatusFilterOnChange = (value: StatusFilter) => {
    setQueryParams({ ...queryParams, statusFilter: value });
  };

  const debouncedSearch = debounce(handleChangeSearch, DEBOUND_SEARCH_TIME);

  const { data: response, isLoading } = useListIncomingDocuments({
    queryParams
  });
  if (isLoading) {
    return <Loading />;
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
            <PageTitle label="văn bản đến" />

            <Box>
              <RouterLink to="create">
                <Button fullWidth variant="contained" startIcon={<AddIcon />}>
                  Thêm vản bản đến
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
              <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel id="status-filter-label">Trạng thái</InputLabel>
                <Select
                  labelId="status-filter-label"
                  label="Trạng thái"
                  defaultValue={0}
                  onChange={(e) =>
                    handleStatusFilterOnChange(e.target.value as StatusFilter)
                  }
                >
                  <MenuItem value={0}>Tất cả</MenuItem>
                  <MenuItem value={StatusFilter.PENDING}>Đang xử lý</MenuItem>
                  <MenuItem value={StatusFilter.EDITING}>
                    Đang chỉnh sửa
                  </MenuItem>
                  <MenuItem value={StatusFilter.PUBLISHED}>
                    Đã phát hành
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <DateRangePickerInput
                disableFuture={true}
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
          <IncomingDocumentTable
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

export default IncomingDocumentManagement;
