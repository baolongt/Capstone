import React from 'react';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemProps,
  ListItemText,
  ListSubheader
} from '@mui/material';
import paths from '../../../constants/routes';
import { Path } from '../../../models/path';
import { NavLink } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const Item = (
  props: Path & {
    isSubItem?: boolean;
  } & ListItemProps
) => {
  const { icon, label, path, isSubItem } = props;
  return (
    <NavLink to={path}>
      <ListItemButton sx={isSubItem ? { pl: 4 } : {}}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={`${label}`} />
      </ListItemButton>
    </NavLink>
  );
};

const CollapseItems = (props: Path) => {
  const { icon, label, subPaths } = props;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => setOpen(!open);

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={`${label}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {subPaths.map((path: Path, i) => {
          return <Item key={i} {...path} isSubItem={true} />;
        })}
      </Collapse>
    </>
  );
};

const SidebarItems: React.FC = () => {
  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
          ></ListSubheader>
        }
      >
        {paths.map((path: Path, i) => {
          return path.subPaths != null ? (
            <CollapseItems key={i} {...path} />
          ) : (
            <Item key={i} {...path} />
          );
        })}
      </List>
    </>
  );
};

export default SidebarItems;
