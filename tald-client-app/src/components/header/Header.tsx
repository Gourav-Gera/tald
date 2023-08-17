import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import headerLogo from "../../assets/images/header-logo.png";
import styles from "./Header.module.scss";
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Designers', 'Editorial', 'Contact'];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box className={styles.headerSecWrapper} onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
			<Image
				src={headerLogo}
				width={84}
				height={35}
				className={styles.logoImage}
				alt="logo image"
			/>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box className={styles.headerSecWrapper} sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        	<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					className={styles.iconColor}
					onClick={handleDrawerToggle}
					sx={{ mr: 2, display: { sm: 'none' } }}
				>
					<MenuIcon className='' />
				</IconButton>
				<Typography
					variant="h6"
					component="div"
					className={styles.imgLogo}
					sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
				>
					<Image
						src={headerLogo}
						width={84}
						  height={35}
						  className={styles.logoImage}
						alt="logo image"
						
					/>
				</Typography>
          	<Box className={styles.navMenu} sx={{ display: { xs: 'none', sm: 'block' } }}>
					{navItems.map((item) => (
					<Button key={item} sx={{ color: '#333' }}>
						{item}
					</Button>
					))}
				</Box>
				<Box className="buttonRegister"  sx={{ ml: 'auto'  }}>
				  	<IconButton size="large" aria-label="search" >
            		<SearchIcon />
					</IconButton>
					<Button className='primaryGray' size="medium">Register</Button>
				</Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      
    </Box>
  );
}

