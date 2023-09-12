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
import { NavLink, useLocation } from 'react-router-dom';

import { adminPaths, officerPaths } from '@/constants/routes';
import useAuth from '@/hooks/useAuth';
import { Role } from '@/models/user';
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
  const location = useLocation();
  const { icon, label, path, isSubItem, isCollapsed, theme } = props;
  const isSelected = location.pathname === path;
  return (
    <NavLink to={path}>
      <ListItemButton
        selected={isSelected}
        sx={{
          color: theme.palette.primary.main,
          ...(isSubItem ? { pl: 4 } : {})
        }}
      >
        <ListItemIcon
          sx={{
            color: isSelected
              ? theme.palette.primary.main
              : theme.palette.secondary.dark
          }}
        >
          {icon}
        </ListItemIcon>
        {isCollapsed ? (
          <></>
        ) : (
          <ListItemText
            sx={{
              color: isSelected
                ? theme.palette.primary.main
                : theme.palette.secondary.dark
            }}
            primary={`${label}`}
          />
        )}
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
          color: theme.palette.primary.main
        }}
        onClick={handleClick}
      >
        <ListItemIcon
          sx={{
            color: theme.palette.secondary.dark
          }}
        >
          {icon}
        </ListItemIcon>
        {isCollapsed ? (
          <></>
        ) : (
          <>
            <ListItemText
              sx={{ color: theme.palette.secondary.dark }}
              primary={`${label}`}
            />
            {open ? (
              <ExpandLess sx={{ color: theme.palette.secondary.dark }} />
            ) : (
              <ExpandMore sx={{ color: theme.palette.secondary.dark }} />
            )}
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
  const {
    authState: { user }
  } = useAuth();

  const paths = user?.roleID === Role.ADMIN ? adminPaths : officerPaths;

  if (user) {
    return (
      <>
        <List
          sx={{ width: '100%', maxWidth: 360 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {paths.map((path: Path, i) => {
            if (path.subPaths) {
              return (
                <CollapseItems
                  key={i}
                  isCollapsed={isCollapsed}
                  {...path}
                  theme={theme}
                />
              );
            }

            return (
              <Item key={i} isCollapsed={isCollapsed} {...path} theme={theme} />
            );
          })}
        </List>
      </>
    );
  }
};

export default SidebarItems;
