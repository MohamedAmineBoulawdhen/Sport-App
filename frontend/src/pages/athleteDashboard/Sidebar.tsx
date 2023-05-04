import { useState } from 'react'
import { Link,NavLink, useLocation } from 'react-router-dom'
import { GiStairsGoal } from 'react-icons/gi'
import { HiOutlineLogin } from 'react-icons/hi'
import { FiSettings } from 'react-icons/fi'
import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined'
import { Tooltip } from '@material-ui/core'
import ChatIcon from '@mui/icons-material/Chat'
import EventIcon from '@mui/icons-material/Event'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import '../../styles/sidebarathlete.css'

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location=useLocation()

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleClose = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="sidebar">
      <IconButton onClick={handleToggle}>
        <Tooltip title="Menu" placement="left">
          <MenuIcon className="MenuIcon" style={{ fontSize: '2.5rem' }} />
        </Tooltip>
      </IconButton>
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: '#fff',
            color: '#000',
            width: '250px',
            height: '100vh',
            top: '4.7rem',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
          },
        }}
      >
        <List>
          <ListItemButton
            component={NavLink}
            to="#"
            className="changeColorOnHover"
          >
            <ListItemIcon>
              <InsertChartOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Progress" className="ListItemText" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/sessions"
            style={
              location.pathname === '/sessions'
                ? { color: '#0066ff' }
                : { color: '' }
            }
            className="changeColorOnHover"
          >
            <ListItemIcon>
              <GiStairsGoal
                style={
                  location.pathname === '/sessions'
                    ? { color: '#0066ff' }
                    : { color: '' }
                }
              />
            </ListItemIcon>
            <ListItemText primary="Sessions" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="#"
            className="changeColorOnHover"
          >
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Messaging" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="#"
            className="changeColorOnHover"
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/editPofile"
            style={
              location.pathname === '/editPofile'
                ? { color: '#0066ff' }
                : { color: '' }
            }
            className="changeColorOnHover"
          >
            <ListItemIcon>
              <AccountCircleOutlinedIcon
                style={
                  location.pathname === '/editPofile'
                    ? { color: '#0066ff' }
                    : { color: '' }
                }
              />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/settings"
            style={
              location.pathname === '/settings'
                ? { color: '#0066ff' }
                : { color: '' }
            }
            className="changeColorOnHover"
          >
            <ListItemIcon>
              <FiSettings
                size={24}
                style={
                  location.pathname === '/settings'
                    ? { color: '#0066ff' }
                    : { color: '' }
                }
              />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
        <IconButton onClick={handleClose} className="CloseIcon">
          <HiOutlineLogin size={25} />
        </IconButton>
      </Drawer>
    </div>
  )
}

export default Sidebar
