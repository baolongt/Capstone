import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Box, ButtonBase, CssBaseline, IconButton, Menu } from '@mui/material';
import {
  Content,
  EdgeSidebar,
  EdgeTrigger,
  Footer,
  getCozyScheme,
  Header,
  Root,
  SidebarContent
} from '@mui-treasury/layout';
import React from 'react';

import { FOOTER_HEADER_HEIGHT } from '@/constants/common';

import DefaultFooter from './footer';
import DefaultHeader from './header';
import SidebarItems from './sidebar';
// import DynamicBreadcrums from './DynamicBreadcrums';

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // TODO: handle open/close sidebar to show only icon
  const headerEdgeTrigger: any = {
    children: (open: any, setOpen: any) => (
      <IconButton onClick={() => setOpen(!open)}>
        {open ? <KeyboardArrowLeft /> : <Menu />}
      </IconButton>
    )
  };

  const sideBarEdgeTrigger: any = {
    children: (collapsed: any, setCollapsed: any) => (
      <ButtonBase
        sx={{
          minHeight: 40,
          width: '100%',
          bgcolor: 'grey.100',
          borderTop: '1px solid',
          borderColor: 'grey.200'
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </ButtonBase>
    )
  };

  return (
    <>
      <CssBaseline />
      <Root scheme={getCozyScheme()}>
        <CssBaseline />
        <Header>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <EdgeTrigger
              target={{ anchor: 'left', field: 'open' }}
              {...headerEdgeTrigger}
            ></EdgeTrigger>
            <DefaultHeader />
          </Box>
        </Header>
        <EdgeSidebar anchor="left">
          <SidebarContent>
            <SidebarItems />
          </SidebarContent>
          <EdgeTrigger
            target={{ anchor: 'left', field: 'collapsed' }}
            {...sideBarEdgeTrigger}
          ></EdgeTrigger>
        </EdgeSidebar>
        <Content
          sx={{ minHeight: `calc(100vh - 10px - ${FOOTER_HEADER_HEIGHT})` }}
        >
          {children}
        </Content>
        <Footer>
          <DefaultFooter />
        </Footer>
      </Root>
    </>
  );
};

export default DashboardLayout;
