import { Box, Grid, Typography } from '@mui/material';
import { debounce } from 'lodash';
import * as React from 'react';

import { useListFiles } from '@/apis';
import { CustomButton, InputSearch } from '@/components/common';
import { FileTable } from '@/components/file';
import { BaseTableQueryParams } from '@/types';

export const FileManagement = () => {
  const [queryParams, setQueryParams] = React.useState<BaseTableQueryParams>({
    page: 1,
    size: 10,
    search: ''
  });

  const { data: response, isLoading } = useListFiles({
    queryParams
  });
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setQueryParams((prev) => ({ ...prev, search: e.target.value }));
  };
  const debouncedSearch = debounce(handleSearch, 500);

  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (response) {
    const { data, metadata } = response;
    return (
      <Box component="div" sx={{ pl: 5, pr: 5 }}>
        <Grid container spacing={2} sx={{ marginBottom: 3, marginTop: 3 }}>
          <Grid item xs={12}>
            <Typography variant="h5">Danh sách sổ văn bản</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              component="div"
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <InputSearch
                placeholder="Search..."
                onTextChange={debouncedSearch}
              />
              <Box component="div" sx={{ display: 'flex', gap: 2 }}>
                <CustomButton label="Thêm sổ mới" />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <FileTable
          metadata={metadata}
          data={data}
          handleChangePage={handleChangePage}
        />
      </Box>
    );
  }
};

export default FileManagement;
