import { Box, Breadcrumbs, Typography } from '@mui/material';
import Link, { LinkProps } from '@mui/material/Link';
import React, { FC, ReactElement } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { pathDict } from '@/constants/routes';

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink} />;
}

const DynamicBreadcrums: FC = (): ReactElement => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        mt: 1
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <LinkRouter underline="hover" color="inherit" to="/">
          {pathDict['/']}
        </LinkRouter>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Typography key={to} color="primary">
              {pathDict[value] || value}
            </Typography>
          ) : (
            <LinkRouter key={to} underline="hover" color="inherit" to={to}>
              {pathDict[value] || value}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default DynamicBreadcrums;
