// ? IMPORTACIÓN DE PAQUETES
import { useState } from 'react'
// Se Importa el Use Navigate de React Router
import { useNavigate } from 'react-router-dom'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import {
  ArrowDropDownOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Search,
  SettingsOutlined,
} from '@mui/icons-material'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'

// ? IMPORTACIÓN DE COMPONENTES
import { auditoriaStore } from '../store/auditoriaStore'
import FlexBetween from './FlexBetween'
import { tokens } from '../theme'

// ! COMIENZO DEL COMPONENTE
const NavBarProtegida = () => {
  // se usa la tienda para elegir el tema
  const setMode = auditoriaStore(state => state.setMode)
  // se usa la tienda para conocer el valor del usuario
  const usuario = auditoriaStore(state => state.usuario)
  // se usa la tienda para ejeutat la funcion logout
  const logout = auditoriaStore(state => state.logout)
  // Uso del Tema
  const theme = useTheme()
  // Creamos constantes para los colores
  const colors = tokens(theme.palette.mode)
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
          <FlexBetween
            borderRadius='9px'
            gap='4rem'
            p='0.1rem 1.5rem'
          >
            <InputBase placeholder='Buscar...' />
            <IconButton>
              <Search sx={{ fontSize: '1.5rem' }}/>
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap='1rem'>
          <IconButton onClick={() => setMode()}>
            {theme.palette.mode === 'dark' ? (
              <LightModeOutlined sx={{ fontSize: '1.5rem' }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: '1.5rem' }} />
            )}
          </IconButton>

          <IconButton>
            <NotificationsOutlinedIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>

          <IconButton>
            <SettingsOutlined sx={{ fontSize: '1.5rem' }} />
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
                height='40px'
                width='40px'
                borderRadius='50%'
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign='left'>
                <Typography
                  variant='h6'
                  color={colors.grey[100]}
                >
                  {usuario.nombres} {usuario.apellidos}
                </Typography>
                <Typography variant='subtitle1' color={colors.greenAccent[500]}>
                  {usuario.cargo}
                </Typography>
              </Box>
              <ArrowDropDownOutlined sx={{ fontSize: '1.5rem' }} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <MenuItem
                onClick={() => {
                  navigate(`/dashboard/usuario/${usuario._id}`)
                }}
              >
                Ver Perfil
              </MenuItem>
              <Divider/>
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
