// ? IMPORTACIÓN DE MODULOS
// Se importa el Use State y useEffect
import { useEffect, useState } from 'react'
// Se Importa el Use Navigate de React Router
import { useLocation, useNavigate } from 'react-router-dom'
// Se importan los iconos
import { Close, DarkMode, LightMode } from '@mui/icons-material'
// Se importan los componentes de MUI
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
// Se importa el MenuIcon de MUI
import MenuIcon from '@mui/icons-material/Menu'

// Se Importa el componente FlexBetween
import { auditoriaStore } from '../store/auditoriaStore'
import FlexBetween from './FlexBetween'
import { tokens } from '../theme'

// ? COMIENZO DEL COMPONENTE
const NavBar = () => {
  // ? FUNCIONES
  // Usamos el PathName
  const { pathname } = useLocation()
  // Usamos la navegacion
  const navigate = useNavigate()
  // se usa la tienda para elegir el valor del tema
  const setMode = auditoriaStore(state => state.setMode)
  // Uso del Tema
  const theme = useTheme()
  // Creamos constantes para los colores
  const colors = tokens(theme.palette.mode)

  // ? USE STATE
  // Estado para saber si se encuentra activo el enlace de una pagina
  const [activo, setActivo] = useState('')
  // Estado para saber si el menu movil se encuentra visible
  const [movilAbierto, setMovilAbierto] = useState(false)

  // ? USE EFFECT
  // Para setear el activo cada vez que hay un cambio en el pathname
  useEffect(() => {
    setActivo(pathname.substring(1))
  }, [pathname])

  // Creamos una funcion para cambiar el estado del menu
  const manejarPestana = () => {
    setMovilAbierto(prevState => !prevState)
  }

  // Se asigna el tamaño de la pestaña en modo Movil
  const anchoVentana = 425
  // Se genera el arreglo para la barra de navegacion en minusculas
  const enlacesNavegacion = [
    'inicio',
    'nosotros',
    'servicios',
    'contactanos',
    'ingresa',
  ]

  // Creamos la pestaña que va a aparecer en el menu Movil
  const pestana = (
    <Box onClick={manejarPestana} sx={{ textAlign: 'center' }}>
      {/* Logo del Auditoria y boton cerrar */}
      <Box display='flex' justifyContent='space-evenly'>
        <Typography
          fontWeight='bold'
          fontSize='max(2rem, 1.2vw)'
          color={colors.grey[100]}
          sx={{
            my: 2,
            '&:hover': {
              cursor: 'pointer',
              color:colors.greenAccent[400]
            },
          }}
        >
          Auditoria Paula
        </Typography>
        {/* //? ICONO PARA CERRAR */}
        <IconButton>
          <Close />
        </IconButton>
      </Box>

      <Divider />

      {/* //? NAVEGACION POR ITEMS */}
      <List>
        {enlacesNavegacion.map(item => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => {
                navigate(item === 'inicio' ? '/' : `/${item}`)
                setActivo(item)
              }}
            >
              <ListItemText>
                <Typography
                  fontSize='max(2rem, 3vw)'
                  color={colors.grey[100]}
                  textTransform='capitalize'
                  sx={{
                    flexGrow: 1,
                    '&:hover': {
                      cursor: 'pointer',
                      color:colors.greenAccent[400]
                    },
                  }}
                >
                  {item}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* //? BOTON PARA CAMBIAR EL TEMA */}
      <IconButton onClick={() => setMode()}>
        {theme.palette.mode === 'dark' ? (
          <LightMode
            sx={{
              fontSize: '20px',
              '&:hover': {
                color: '#f39f18',
                cursor: 'pointer',
              },
            }}
          />
        ) : (
          <DarkMode
            sx={{
              fontSize: '20px',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          />
        )}
      </IconButton>
    </Box>
  )

  return (
    <Box component='nav'>
      {/* //? MENU DESPLEGABLE */}
      <Drawer
        variant='temporary'
        open={movilAbierto}
        onClose={manejarPestana}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: anchoVentana,
          },
        }}
      >
        {pestana}
      </Drawer>

      <FlexBetween padding='1rem 6%' backgroundColor={colors.primary[400]}>
        <Typography
          fontWeight='bold'
          fontSize='clamp(2.3rem, 2rem, 3.3rem)'
          lineHeight='1'
          component='div'
          color={colors.grey[100]}
          sx={{
            flexGrow: 1,
            '&:hover': {
              cursor: 'pointer',
              color:colors.greenAccent[400]
            },
          }}
          onClick={() => navigate('/')}
        >
          Auditorias Paula
        </Typography>

        <IconButton
          aria-label='open drawer'
          edge='start'
          onClick={manejarPestana}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* //? NAVEGACION POR ITEMS */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {enlacesNavegacion.map(item => (
            <Button
              key={item}
              onClick={() => {
                navigate(item === 'inicio' ? '/' : `/${item}`)
                setActivo(item)
              }}
            >
              <Typography
                fontSize='max(1rem, 1.2vw)'
                color={colors.grey[100]}
                sx={{
                  flexGrow: 1,
                  '&:hover': {
                    cursor: 'pointer',
                    color:colors.greenAccent[400]
                  },
                }}
              >
                {item}
              </Typography>
            </Button>
          ))}
        </Box>

        {/* //? BOTON PARA CAMBIAR EL TEMA */}
        <IconButton onClick={() => setMode()}>
          {theme.palette.mode === 'dark' ? (
            <LightMode
              sx={{
                fontSize: '25px',
                display: { xs: 'none', sm: 'flex' },
                '&:hover': {
                  color: '#f39f18',
                  cursor: 'pointer',
                },
              }}
            />
          ) : (
            <DarkMode
              sx={{
                fontSize: '20px',
                display: { xs: 'none', sm: 'flex' },
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            />
          )}
        </IconButton>
      </FlexBetween>
    </Box>
  )
}

export default NavBar
