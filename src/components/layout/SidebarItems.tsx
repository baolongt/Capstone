import React from 'react';
import { List, ListItemIcon, ListItemText } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import { Link as RouterLink } from 'react-router-dom';

interface ListItemLinkProps extends ListItemProps {
  text: string;
  to: string;
  open?: boolean;
}

const ListItemLink = (props: ListItemLinkProps) => {
  const { to, open, text, ...other } = props;

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItem button component={RouterLink as any} to={to} {...other}>
        <ListItemIcon>
          {text.length % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
        {icon}
      </ListItem>
    </li>
  );
};

const SidebarItems: React.FC = () => {
  return (
    <>
      <List>
        {['Index', 'Started', 'Do some thing else', 'Vip'].map(
          (path, index) => (
            <ListItemLink
              key={index}
              to={`/${path.split(' ').join('-')}`}
              text={path}
            />
            // <ListItem key={text} disablePadding>
            //   <ListItemButton>
            //     <ListItemText primary={text} />
            //   </ListItemButton>
            // </ListItem>
          )
        )}
      </List>
    </>
  );
};

export default SidebarItems;
