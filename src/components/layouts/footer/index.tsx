import { Box, Container, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';

const Footer: FC = (): ReactElement => {
  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        height: 'auto',
        textAlign: 'center',
        py: 1
      }}
    >
      <Container maxWidth="lg">
        <Typography color="textSecondary" variant="body2">
          {`${new Date().getFullYear()} | Document Management System`}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
