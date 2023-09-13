import { Box, CssBaseline, useTheme } from '@mui/material';
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
                height: 56
              },
              md: {
                position: 'sticky',
                height: 56
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
              pb: 1,
              borderBottom: `1px solid ${theme.palette.divider}`
            }}
          >
            <Box
              sx={{
                mt: 1,
                mx: 'auto',
                width: DEFAULT_PAGE_WIDTH,
                justifyContent: 'end',
                display: 'flex'
              }}
            >
              <DefaultHeader />
            </Box>
          </Box>
        </Header>
        <EdgeSidebar anchor="left">
          <SidebarContent
            sx={{
              mt: 10,
              bgcolor: '#fff'
            }}
          >
            <SidebarItems isCollapsed={false} />
          </SidebarContent>
          <EdgeTrigger
            target={{ anchor: 'left', field: 'collapsed' }}
          ></EdgeTrigger>
        </EdgeSidebar>
        <Content
          sx={{
            width: '100vw',
            minHeight: `calc(100vh - 10px - ${FOOTER_HEADER_HEIGHT})`,
            bgcolor: theme.palette.secondary.light
          }}
        >
          <Outlet />
        </Content>
        <Footer
          sx={{
            bgcolor: '#eee'
          }}
        >
          <DefaultFooter />
        </Footer>
      </Root>
    </>
  );
};

export default DashboardLayout;
