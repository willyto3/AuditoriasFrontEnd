// ? IMPORTACIÓN DE MODULOS
// Importacion de Outlet de React Router
import { Navigate, Outlet } from 'react-router-dom'
// Importamos useMemo de React
import { useMemo, useState } from 'react'
// Importamos CssBaseLine, Theme Provider y createTheme de mui Material
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material'

// ? IMPORTACIÓN DE COMPONENTES
import { auditoriaStore } from '../store/auditoriaStore'
// Importamos themeSettings del arhivo theme
import { themeSettings } from '../theme'
// Importación de la barra Lateral
import SideBar from '../components/SideBar'
// Importación de la barra de navegacion protegida
import NavBarProtegida from '../components/NavBarProtegida'

const Protegido = () => {
  // se usa la tienda para elegir el valor del tema
  const eleccionTema = auditoriaStore(state => state.eleccionTema)
  // se usa la tienda para elegir el valor del tema
  const token = auditoriaStore(state => state.token)
  // Funcion para cambiar el Tema
  const tema = useMemo(
    () => createTheme(themeSettings(eleccionTema)),
    [eleccionTema]
  )

  // Se define la pantalla completa
  const pantallaCompleta = useMediaQuery('(min-width:600px)')

  const [abiertaSideBar, setAbiertaSideBar] = useState(true)

  if (token === '') {
    return <Navigate to='/' />
  }

  return (
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <Box
        display={pantallaCompleta ? 'flex' : 'block'}
        width='100%'
        height='100%'
      >
        <SideBar
          pantallaCompleta={pantallaCompleta}
          drawerWidth='250px'
          abiertaSideBar={abiertaSideBar}
          setAbiertaSideBar={setAbiertaSideBar}
        />
        <Box flexGrow={1}>
          <NavBarProtegida
            abiertaSideBar={abiertaSideBar}
            setAbiertaSideBar={setAbiertaSideBar}
          />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
export default Protegido
