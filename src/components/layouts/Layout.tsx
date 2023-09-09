import { Box, CssBaseline, useTheme } from '@mui/material';
import {
  Content,
  EdgeSidebar,
  EdgeTrigger,
  Footer,
  Header,
  Root,
  SidebarContent,
  TopHeader
} from '@mui-treasury/layout';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { FOOTER_HEADER_HEIGHT } from '@/constants/common';

import DefaultFooter from './footer';
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
                height: 64
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
            bgcolor={theme.palette.primary.main}
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              px: 2,
              gap: 1
            }}
          ></Box>
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
            minHeight: `calc(100vh - 10px - ${FOOTER_HEADER_HEIGHT})`,
            bgcolor: '#eee'
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
