import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import LogOut from "@mui/icons-material/Logout"
import { NavLink, Outlet, useNavigate } from "react-router";
import { useState } from "react";

export default function AppShell() {

    const drawerWidth = 240;

    const [open, setOpen] = useState(false)

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
            <List>
                {
                    navMenus.map(({ path, text }) => {
                        return (
                            <NavLink to={path} key={`${text}-${path}`} className={({ isActive }) =>
                                `flex items-center px-3 py-2 rounded hover:bg-gray-200 ${isActive ? 'active-drawer-item bg-gray-300 text-green-700 font-medium' : ''
                                }`
                            }>
                                <div
                                    className="flex"
                                >
                                    <span className="ml-3">{text}</span>
                                </div>
                            </NavLink>

                        )
                    })
                }
            </List>
            <Divider />
        </div>
    )

    const navigate = useNavigate();

    const handleLogOut = () => {
        navigate('/login')
    }

    const handleToggle = () => {
        setOpen(!open)
    }

    const handleClose = () => {
        setOpen(false)
    }

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
                    variant="persistent"
                    open={open}
                    onClose={handleClose}
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            top: '100px', // height of AppBar
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
                    p: 3,
                    marginLeft: open ? `${drawerWidth}px` : 0,
                    transition: 'margin 0.3s'
                }}
            >
                {/* <Typography>
                    This is your main content area. The drawer will not overlap the header.
                </Typography> */}
                <Outlet />
            </Box>
        </div>

    )
}