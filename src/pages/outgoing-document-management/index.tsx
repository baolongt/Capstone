import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Button, InputAdornment, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import OutGoingDocumentTable from '@/components/document/outgoing/OutGoingDocumentTable';

const OutgoingDocumentManagement = () => {
  return (
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
        <OutGoingDocumentTable />
      </Grid>
    </Grid>
  );
};

export default OutgoingDocumentManagement;
