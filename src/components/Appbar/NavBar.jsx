import { styled } from '@mui/material/styles';

import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import MenuIcon from '@mui/icons-material/Menu';

import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';




const drawerWidth = 240;

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const PATHNAME = {
    '/embarques':'Embarques',
    '/charts':'Charts',
    '/gastos':'Gastos'
}



const NavBar = ({ open, toggleDrawer }) => {

    const { auth, handleLogout } = useAuth();

    const { pathname } = useLocation();

    

    return (

        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    { PATHNAME[pathname]}

                </Typography>

                <Typography
                    component="h1"
                    
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    {`${auth.name}  ${auth.lastname}`}

                </Typography>


                <IconButton onClick={handleLogout} color="inherit">

                    <LogoutIcon  />

                    <Typography
                        component="span"
                    >
                        Logout

                    </Typography>

                    {/* <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
             */}
                </IconButton>
            </Toolbar>
        </AppBar>
    );


}

export default NavBar;