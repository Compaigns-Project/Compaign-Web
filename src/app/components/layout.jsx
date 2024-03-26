// layout.jsx
"use client";
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Collapse } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import Image from 'next/image';
import logo from './Dashboadlogo.gif';
import { SpaceDashboard , QueryStats, PeopleAlt, Work , Mail,Settings, AccountCircleIcon, Help, LibraryBooks, Recommend, LiveHelp} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

const drawerWidth = 240;

function Layout(props) {
  const router = useRouter();
  const pathname = usePathname();
  console.log('Pathname is ', pathname);
  const { window, children } = props;  // corrected 'childern' to 'children'
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapse, setIsCollapse] = useState(false);

  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const drawer = (
    <div>
      <Toolbar className='p-[-20px] m-[-8px]'>
        <Image className='ml-[-20px]' src={logo} height={80} width={80} alt='Logo'></Image>
        <Typography variant="h4" noWrap component="div">
          TheKoi
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {['Dashboard', 'Compaigns', 'Analytics', 'Users','Communications'].map((text, index) => (
          <ListItem key={text} disablePadding className={pathname.startsWith("/" + text.toLowerCase()) ? "text-sky-600 bg-slate-100" : "text-slate-700" } onClick={()=>{router.push("/" + text.toLowerCase())}}>
            <ListItemButton>
              <ListItemIcon className={pathname.startsWith("/" + text.toLowerCase()) ? "text-sky-600 bg-slate-100" : "text-slate-700" }>

                {index === 0 && <SpaceDashboard/> }
                {index === 1 && <Work/> }
                {index === 2 && <QueryStats/> }
                {index === 3 && <PeopleAlt/> }
                {index === 4 && <Mail/> }
                
                
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem  disablePadding onClick={handleCollapse} className={pathname.startsWith("/help")  ? "text-sky-600 bg-slate-100" : "text-slate-700" }>
          <ListItemButton>
            <ListItemIcon className={pathname.startsWith("/help")  ? "text-sky-600 bg-slate-100" : "text-slate-700" } onClick={()=>{router.push("/help")}}>
              <Help/>
            </ListItemIcon>
            <ListItemText primary="Help" />
            {isCollapse ? <ExpandMoreIcon/> : <ExpandLessIcon/> }
          </ListItemButton>
        </ListItem>    
      </List>
      <Divider />
      <Collapse in={isCollapse} timeout="auto" unmountOnExit>
        <List className='ml-4'>
          {['Support', 'Contact', 'Help'].map((text, index) => (
            <ListItem key={text} disablePadding className={pathname.startsWith("/" + text.toLowerCase()) ? "text-sky-600 bg-slate-100" : "text-slate-700" } onClick={()=>{router.push("/" + text.toLowerCase())}}>
              <ListItemButton>
                <ListItemIcon className={pathname.startsWith("/" + text.toLowerCase()) ? "text-sky-600 bg-slate-100" : "text-slate-700" }>
                {index === 0 && <LibraryBooks/> }
                {index === 1 && <Recommend/> }
                {index === 2 && <LiveHelp/> }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor:"#FFFFFF",
          color:"#2F2F2F"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <main>{children}</main> {/* Corrected spelling of 'children' */}
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node, // Corrected prop type to 'node'
};

export default Layout;
