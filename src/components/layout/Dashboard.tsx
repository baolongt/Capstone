import React from 'react';
import {
  Root,
  Header,
  EdgeSidebar,
  EdgeTrigger,
  Content,
  Footer,
  SidebarContent,
  getCozyScheme
} from '@mui-treasury/layout';
import { ButtonBase, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SidebarItems from './SidebarItems';
import DefaultFooter from './DefaultFooter';
import useCurrentPath from '../../hooks/useCurrentPath';
import DynamicBreadcrums from './DynamicBreadcrums';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const currentPath = useCurrentPath();

  console.log(currentPath);

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
        onClick={() => setCollapsed(!collapsed)}
        sx={{
          minHeight: 40,
          width: '100%',
          bgcolor: 'grey.100',
          borderTop: '1px solid',
          borderColor: 'grey.200'
        }}
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
              px: 2,
              gap: 1
            }}
          >
            <EdgeTrigger
              target={{ anchor: 'left', field: 'open' }}
              {...headerEdgeTrigger}
            ></EdgeTrigger>
            Test apps
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
        <Content sx={{ minHeight: '1000px' }}>
          <DynamicBreadcrums />
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
