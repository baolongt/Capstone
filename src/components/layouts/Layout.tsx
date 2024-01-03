import { Box, CssBaseline, Typography, useTheme } from '@mui/material';
import {
  Content,
  EdgeSidebar,
  EdgeTrigger,
  Footer,
  Header,
  Root,
  SidebarContent
} from '@mui-treasury/layout';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { DEFAULT_PAGE_WIDTH, FOOTER_HEADER_HEIGHT } from '@/constants/common';

import DynamicBreadcrums from './DynamicBreadcrums';
import DefaultFooter from './footer';
import DefaultHeader from './header';
import SidebarItems from './sidebar';
// import DynamicBreadcrums from './DynamicBreadcrums';

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <Root
        scheme={{
          header: {
            config: {
              xs: {
                position: 'sticky',
                height: 66
              },
              md: {
                position: 'sticky',
                height: 66
              }
            }
          },
          leftEdgeSidebar: {
            autoCollapse: 'sm',
            config: {
              md: {
                variant: 'permanent',
                width: 256,
                collapsedWidth: 64
              }
            }
          }
        }}
      >
        <CssBaseline />
        <Header>
          <Box
            bgcolor="#fff"
            sx={{
              px: 2,
              py: 1,
              borderBottom: `1px solid ${theme.palette.divider}`
            }}
          >
            <Box
              sx={{
                mt: 1,
                mx: 'auto',
                width: DEFAULT_PAGE_WIDTH,
                [theme.breakpoints.down('xl')]: {
                  width: '90%'
                },
                justifyContent: 'space-between',
                display: 'flex'
              }}
            >
              <DynamicBreadcrums />
              <DefaultHeader />
            </Box>
          </Box>
        </Header>
        <EdgeSidebar anchor="left">
          <SidebarContent
            sx={{
              bgcolor: '#fff'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                my: 5,
                mx: 'auto'
              }}
            >
              <img
                src="https://ductt-capstone-bucket.s3.ap-southeast-1.amazonaws.com/assets/favicon_io/android-chrome-192x192.png"
                alt="Logo"
                width={32}
                height={32}
              />
              <Typography sx={{ ml: 1 }} variant="h6">
                Quản lý văn bản
              </Typography>
            </Box>
            <SidebarItems isCollapsed={false} />
          </SidebarContent>
          <EdgeTrigger
            target={{ anchor: 'left', field: 'collapsed' }}
          ></EdgeTrigger>
        </EdgeSidebar>
        <Content
          sx={{
            minHeight: `calc(100vh - ${FOOTER_HEADER_HEIGHT})`,
            bgcolor: theme.palette.secondary.light,
            pb: 3
          }}
        >
          <Outlet />
        </Content>
        {/* <Footer
          sx={{
            bgcolor: '#eee'
          }}
        >
          <DefaultFooter />
        </Footer> */}
      </Root>
    </>
  );
};

export default DashboardLayout;
