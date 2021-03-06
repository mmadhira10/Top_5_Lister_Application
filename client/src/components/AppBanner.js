import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'



import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        if(auth.loggedIn)
        {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    const menuId = 'primary-search-account-menu';

    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    let menu;
    if (auth.loggedIn || auth.guest) {
        menu = loggedInMenu;
    }
    
    function getAccountMenu(loggedIn, guest) {
        let userInitials = auth.getUserInitials();
        
        if (loggedIn) 
            return <div>{userInitials}</div>;
        else if (guest)
            return <AccountCircle />;
    }

    let icon;
    if (auth.loggedIn || auth.guest)
    {
        icon = 
        <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            edge="end"
        >
            { getAccountMenu(auth.loggedIn, auth.guest) }
        </IconButton>
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <Link style={{ textDecoration: 'none', color: '#CDAD00' }} to='/'>T<sup>5</sup>L</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {icon}
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}