import { Box, Container, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';

const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        textAlign: 'center',
        py: 1
      }}
    >
      <Container maxWidth="lg">
        <Typography color="black" variant="h6">
          Capstone project
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {`${new Date().getFullYear()} | FPT University`}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
