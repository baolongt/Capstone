import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useListDocuments } from '@/apis';
import { OutgoingDocumentTable } from '@/components/document';
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

  const { data: response, isLoading } = useListDocuments({
    queryParams
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (response) {
    const { data, metadata } = response;

    return (
      <Box sx={{ paddingLeft: 5, paddingRight: 5 }}>
        <Grid container spacing={2} paddingTop={3}>
          <Grid item xs={5} marginLeft={3}>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={2}>
            <RouterLink to="create">
              <Button fullWidth variant="contained" startIcon={<AddIcon />}>
                Đăng ký văn bản đi
              </Button>
            </RouterLink>
          </Grid>
          <Grid item xs={12}>
            <OutgoingDocumentTable
              metadata={metadata}
              data={data}
              handleChangePage={handleChangePage}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
};

export default OutgoingDocumentManagement;
