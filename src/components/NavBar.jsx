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

// ? COMIENZO DEL COMPONENTE
const NavBar = () => {

  // ? FUNCIONES
  // Usamos el PathName
  const { pathname } = useLocation()
  // Usamos la navegacion
  const navigate = useNavigate()
  // se usa la tienda para elegir el valor del tema
  const setEleccionTema = auditoriaStore(state => state.setEleccionTema)
  // Uso del Tema
  const tema = useTheme()

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
  // Creamos constantes para los colores
  const neutralLigth = tema.palette.neutral.light
  const dark = tema.palette.neutral.dark

  // Creamos la pestaña que va a aparecer en el menu Movil
  const pestana = (
    <Box onClick={manejarPestana} sx={{ textAlign: 'center' }}>
      {/* Logo del Auditoria y boton cerrar */}
      <Box display='flex' justifyContent='space-evenly'>
        <Typography
          fontWeight='bold'
          fontSize='max(2rem, 1.2vw)'
          sx={{
            my: 2,
            '&:hover': {
              color: tema.palette.primary.main,
              cursor: 'pointer',
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
                  fontSize='max(0.9rem, 1.2vw)'
                  sx={{
                    flexGrow: 1,
                    '&:hover': {
                      color: tema.palette.primary.main,
                      cursor: 'pointer',
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
      <IconButton onClick={() => setEleccionTema()}>
        {tema.palette.mode === 'dark' ? (
          <LightMode
            sx={{
              color: dark,
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
                color: '#3c688e',
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

      <FlexBetween padding='1rem 6%' backgroundColor={neutralLigth}>
        <Typography
          fontWeight='bold'
          fontSize='clamp(2rem, 2rem, 3.3rem)'
          lineHeight='1'
          component='div'
          color={dark}
          sx={{
            flexGrow: 1,
            '&:hover': {
              color: tema.palette.primary.main,
              cursor: 'pointer',
            },
          }}
          onClick={() => navigate('/')}
        >
          Auditorias Paula
        </Typography>

        <IconButton
          color='inherit'
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
              sx={{ color: dark }}
              onClick={() => {
                navigate(item === 'inicio' ? '/' : `/${item}`)
                setActivo(item)
              }}
            >
              <Typography
                fontSize='max(0.9rem, 1.2vw)'
                sx={{
                  flexGrow: 1,
                  '&:hover': {
                    color: tema.palette.primary.main,
                    cursor: 'pointer',
                  },
                }}
              >
                {item}
              </Typography>
            </Button>
          ))}
        </Box>

        {/* //? BOTON PARA CAMBIAR EL TEMA */}
        <IconButton onClick={() => setEleccionTema()}>
          {tema.palette.mode === 'oscuro' ? (
            <LightMode
              sx={{
                color: dark,
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
                  color: '#3c688e',
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
