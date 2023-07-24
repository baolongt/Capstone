import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemProps,
  ListItemText,
  SxProps,
  Theme,
  useTheme
} from '@mui/material';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import paths from '@/constants/routes';
import { Path } from '@/types';

type SidebarItemsProps = {
  isCollapsed: boolean;
};

type ItemProps = Path & {
  isSubItem?: boolean;
  theme: Theme;
} & ListItemProps &
  SidebarItemsProps &
  SxProps;

const Item = (props: ItemProps) => {
  const { icon, label, path, isSubItem, isCollapsed, theme } = props;
  return (
    <NavLink to={path}>
      <ListItemButton
        sx={{
          color: theme.palette.primary.contrastText,
          ...(isSubItem ? { pl: 4 } : {})
        }}
      >
        <ListItemIcon
          sx={{
            color: theme.palette.primary.contrastText
          }}
        >
          {icon}
        </ListItemIcon>
        {isCollapsed ? <></> : <ListItemText primary={`${label}`} />}
      </ListItemButton>
    </NavLink>
  );
};

type CollapseItemsProps = Path &
  SidebarItemsProps & {
    theme: Theme;
  };

const CollapseItems = (props: CollapseItemsProps) => {
  const { icon, label, subPaths, isCollapsed, theme } = props;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isCollapsed) {
      setOpen(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (isCollapsed) {
      setOpen(false);
    }
  }, [isCollapsed]);

  return (
    <>
      <ListItemButton
        sx={{
          color: theme.palette.primary.contrastText
        }}
        onClick={handleClick}
      >
        <ListItemIcon
          sx={{
            color: theme.palette.primary.contrastText
          }}
        >
          {icon}
        </ListItemIcon>
        {isCollapsed ? (
          <></>
        ) : (
          <>
            <ListItemText primary={`${label}`} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </>
        )}
        <></>
      </ListItemButton>
      <Collapse unmountOnExit in={open} timeout="auto">
        {subPaths?.map((path: Path, i) => {
          return (
            <Item
              key={i}
              isCollapsed={isCollapsed}
              {...path}
              isSubItem={true}
              theme={theme}
            />
          );
        })}
      </Collapse>
    </>
  );
};

const SidebarItems: React.FC<SidebarItemsProps> = ({ isCollapsed }) => {
  const theme = useTheme();
  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {paths.map((path: Path, i) => {
          return path.subPaths != null ? (
            <CollapseItems
              key={i}
              isCollapsed={isCollapsed}
              {...path}
              theme={theme}
            />
          ) : (
            <Item key={i} isCollapsed={isCollapsed} {...path} theme={theme} />
          );
        })}
      </List>
    </>
  );
};

export default SidebarItems;
