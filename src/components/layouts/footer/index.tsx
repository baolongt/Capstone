import React, { FC, ReactElement } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        paddingTop: '1rem',
        paddingBottom: '1rem'
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="h5">
              Capstone project
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()} | FPT University`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
