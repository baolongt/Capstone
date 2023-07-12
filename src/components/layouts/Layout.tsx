import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Menu from '@mui/icons-material/Menu';
import { ButtonBase, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
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
        <Content sx={{ minHeight: '1000px' }}>{children}</Content>
        <Footer>
          <DefaultFooter />
        </Footer>
      </Root>
    </>
  );
};

export default DashboardLayout;
