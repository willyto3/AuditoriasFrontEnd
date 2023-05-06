// ? IMPORTACIÓN DE MODULOS
import {
  ArrowDropDownOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from '@mui/icons-material'
import { PropTypes } from 'prop-types'
import { useState } from 'react'
// Se Importa el Use Navigate de React Router
import { useTheme } from '@emotion/react'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

// ? IMPORTACIÓN DE COMPONENTES
import { auditoriaStore } from '../store/auditoriaStore'
import FlexBetween from './FlexBetween'

const NavBarProtegida = ({ abiertaSideBar, setAbiertaSideBar }) => {
  // se usa la tienda para elegir el tema
  const setEleccionTema = auditoriaStore(state => state.setEleccionTema)
  // se usa la tienda para conocer el valor del usuario
  const usuario = auditoriaStore(state => state.usuario)
  // se usa la tienda para ejeutat la funcion logout
  const logout = auditoriaStore(state => state.logout)
  // Uso del Tema
  const tema = useTheme()
  // Usamos la navegacion
  const navigate = useNavigate()

  // ? USE STATE
  const [anchorEl, setAchorEl] = useState(null)
  const isOpen = Boolean(anchorEl)

  const handleClick = event => setAchorEl(event.currentTarget)
  const handleClose = () => setAchorEl(null)

  return (
    <AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <FlexBetween>
          <IconButton onClick={() => setAbiertaSideBar(!abiertaSideBar)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={tema.palette.background.alt}
            borderRadius='9px'
            gap='4rem'
            p='0.1rem 1.5rem'
          >
            <InputBase placeholder='Buscar...' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap='1.5rem'>
          <IconButton onClick={() => setEleccionTema()}>
            {tema.palette.mode === 'oscuro' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ ontSize: '25px' }} />
            )}
          </IconButton>

          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textTransform: 'none',
                gap: '1rem',
              }}
            >
              <Box
                component='img'
                alt='profile'
                src={`http://localhost:5001/images/${usuario.picturePath}`}
                height='32px'
                width='32px'
                borderRadius='50%'
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign='left'>
                <Typography
                  fontWeight='bold'
                  fontSize='0.85rem'
                  sx={{ color: tema.palette.secondary[100] }}
                >
                  {usuario.nombres} {usuario.apellidos}
                </Typography>
                <Typography
                  fontWeight='bold'
                  fontSize='0.75rem'
                  sx={{ color: tema.palette.secondary[200] }}
                >
                  {usuario.cargo}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: tema.palette.secondary[300], fontSize: '25px' }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <MenuItem
                onClick={() => {
                  logout()
                  navigate('/')
                }}
              >
                Salir
              </MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}
export default NavBarProtegida

NavBarProtegida.propTypes = {
  abiertaSideBar: PropTypes.bool,
  setAbiertaSideBar: PropTypes.any,
}
