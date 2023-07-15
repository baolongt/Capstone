import { Box, Breadcrumbs, Typography } from '@mui/material';
import Link, { LinkProps } from '@mui/material/Link';
import React, { FC, ReactElement } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}

const DynamicBreadcrums: FC = (): ReactElement => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        height: 'auto',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        paddingLeft: '1rem'
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <LinkRouter underline="hover" color="inherit" to="/">
          Home
        </LinkRouter>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Typography key={to} color="text.primary">
              {value}
            </Typography>
          ) : (
            <LinkRouter key={to} underline="hover" color="inherit" to={to}>
              {value}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default DynamicBreadcrums;
