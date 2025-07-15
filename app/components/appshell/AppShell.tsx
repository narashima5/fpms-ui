import { AppBar, Box, Divider, Drawer, IconButton, List, Toolbar, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import LeftArrow from "@mui/icons-material/ArrowBack"
import LogOut from "@mui/icons-material/Logout"
import { NavLink, Outlet, useNavigate } from "react-router";
import { useState } from "react";

export default function AppShell() {

    const drawerWidth = 240;

    const [desktopOpen, setDesktopOpen] = useState(false)

    const isSmallScreen = useMediaQuery('(max-width:600px)')

    const navigate = useNavigate();

    const handleLogOut = () => {
        navigate('/login')
    }

    const handleToggle = () => {
        setDesktopOpen(!desktopOpen)
    }

    const handleClose = () => {
        setDesktopOpen(false)
    }

    const navMenus = [
        {
            path: '/dashboard',
            text: 'Dashboard'
        },
        {
            path: '/products',
            text: 'Products'
        },
        {
            path: '/bills',
            text: 'Billing List'
        },
        {
            path: '/new-bill',
            text: 'Billing'
        }
    ]

    const DrawerList = (
        <div className={`w-[${drawerWidth}px]`}>

            <Divider />
            <div>
                <IconButton onClick={handleToggle} hidden={!isSmallScreen}>
                    <LeftArrow />
                </IconButton>
            </div>
            <List>
                {
                    navMenus.map(({ path, text }) => {
                        return (
                            <NavLink to={path} key={`${text}-${path}`} className={({ isActive }) =>
                                `flex items-center px-3 py-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-300 text-green-700' : ''
                                }`
                            }>
                                <div
                                    className="flex"
                                >
                                   <p className="ml-3">{text}</p> 
                                </div>
                            </NavLink>

                        )
                    })
                }
            </List>
            <Divider />
        </div>
    )

    

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className="flex flex-col justify-center" position="static" sx={{ backgroundColor: 'white', color: 'black', height: '100px' }}>
                    <Toolbar>
                        <IconButton
                            onClick={handleToggle}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            LOGO
                        </Typography>
                        <IconButton
                            onClick={handleLogOut}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <LogOut />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Drawer
                    variant={isSmallScreen ? 'temporary' : 'persistent'}
                    open={desktopOpen}
                    onClose={handleClose}
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: !isSmallScreen ? 'border-box':'unset',
                            top: isSmallScreen ? 0 : '100px', // height of AppBar
                        },
                    }}
                >
                    {DrawerList}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    px: 3,
                    pt: 3,
                    marginLeft: !isSmallScreen ? (desktopOpen ? `${drawerWidth}px` : 0) : 0,
                    transition: 'margin 0.3s'
                }}
            >
                <Outlet />
            </Box>
        </div>

    )
}