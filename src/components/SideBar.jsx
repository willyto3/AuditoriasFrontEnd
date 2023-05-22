// ? IMPORTACIÓN DE PAQUETES
import { PropTypes } from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import { useState } from 'react'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { ChevronLeft, ReceiptLongOutlined } from '@mui/icons-material'
import { Box, Typography, useTheme } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'

// ? IMPORTACIÓN DE COMPONENTES
import { auditoriaStore } from '../store/auditoriaStore'
import { tokens } from '../theme'

const navItems = [
  {
    title: 'Dashboard',
    to: '/dashboard',
    icon: <HomeOutlinedIcon />,
  },
  {
    title: 'Auditores',
    icon: null,
  },
  {
    title: 'Listado Auditores',
    to: 'listado',
    icon: <PeopleOutlinedIcon />,
  },
  {
    title: 'Registro Auditores',
    to: 'registro',
    icon: <ReceiptLongOutlined />,
  },
  {
    title: 'Clientes',
    icon: null,
  },
  {
    title: 'Listado Clientes',
    to: 'clientlist',
    icon: <PeopleOutlinedIcon />,
  },
  {
    title: 'Registro Clientes',
    to: 'registro',
    icon: <ReceiptLongOutlined />,
  },
]

const SideBar = () => {
  // ? CONSTANTES
  // se usa la tienda para conocer el valor del usuario
  const usuario = auditoriaStore(state => state.usuario)
  const navigate = useNavigate()
  const theme = useTheme()
  const { collapseSidebar, collapsed } = useProSidebar()
  // Creamos constantes para los colores
  const colors = tokens(theme.palette.mode)

  const [selected, setSelected] = useState('dashboard')

  const Item = ({ title, to, icon, selected }) => {
    return (
      <MenuItem
        active={selected === title}
        style={{ color: colors.grey[100] }}
        onClick={() => {
          setSelected(title)
          navigate(to)
        }}
        icon={icon}
      >
        <Typography color={colors.grey[100]}>{title}</Typography>
      </MenuItem>
    )
  }

  return (
    <Box
      sx={{
        position: 'sticky',
        display: 'flex',
        height: '100vh',
        top: 0,
        bottom: 0,
        zIndex: 10000,
        '& .sidebar': {
          border: 'none',
        },
        '& .ps-menu-icon': {
          backgroundColor: 'transparent !important',
        },
        '& .ps.menu-item': {
          backgroundColor: 'transparent !important',
        },
        '& .ps-menu-anchor': {
          color: 'inherit !important',
          backgroundColor: 'transparent !important',
        },
        '& .ps-menu-item:hover': {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: 'transparent !important',
        },
        '& .ps-menu-item.ps-active': {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: 'transparent !important',
        },
      }}
    >
      <Sidebar backgroundColor={colors.primary[400]}>
        <Menu iconShape='square'>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => collapseSidebar()}
            icon={collapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 10px 0',
            }}
          >
            {!collapsed && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                ml='20px'
              >
                <Typography variant='h6'>AUDITORIAS PAULA </Typography>
                <ChevronLeft />
              </Box>
            )}
          </MenuItem>

          {!collapsed ? (
            <Box mb='15px'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <img
                  alt='profile-user'
                  width='140px'
                  height='150px'
                  src={`http://localhost:5001/images/${usuario.picturePath}`}
                  style={{ cursor: 'pointer', borderRadius: '40px' }}
                />
              </Box>
              <Box textAlign='center'>
                <Typography
                  variant='h6'
                  fontWeight='bold'
                  color={colors.grey[100]}
                  sx={{ m: '10px 0 0 0' }}
                >
                  {usuario.nombres} {usuario.apellidos}
                </Typography>
                <Typography variant='h6' color={colors.greenAccent[400]}>
                  {usuario.cargo}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              component='img'
              alt='profile'
              src={`http://localhost:5001/images/${usuario.picturePath}`}
              height='40px'
              width='40px'
              borderRadius='50%'
              sx={{ objectFit: 'cover', m: '5px 0 5px 15px' }}
            />
          )}

          <Box paddingLeft={collapsed ? undefined : '10%'}>
            {navItems.map(({ title, to, icon }) => {
              if (!icon) {
                return (
                  <Typography
                    key={title}
                    variant='h6'
                    color={colors.greenAccent[300]}
                    sx={{ m: '10px 0 5px 10px' }}
                  >
                    {title}
                  </Typography>
                )
              }
              return (
                <Item
                  key={title}
                  title={title}
                  to={to}
                  icon={icon}
                  selected={selected}
                  setSelected={setSelected}
                />
              )
            })}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  )
}
export default SideBar

SideBar.propTypes = {
  title: PropTypes.string,
}
