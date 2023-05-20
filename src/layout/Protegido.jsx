// ? IMPORTACIÓN DE PAQUETES
// Importacion de Outlet de React Router
import { Navigate, Outlet } from 'react-router-dom'
// Importamos CssBaseLine, Theme Provider y createTheme de mui Material
import { Box, useMediaQuery } from '@mui/material'

// ? IMPORTACIÓN DE COMPONENTES
import { auditoriaStore } from '../store/auditoriaStore'
// Importación de la barra Lateral
import SideBar from '../components/SideBar'
// Importación de la barra de navegacion protegida
import NavBarProtegida from '../components/NavBarProtegida'

const Protegido = () => {
  // se usa la tienda para elegir el valor del tema
  const token = auditoriaStore(state => state.token)

  // Se define la pantalla completa
  const pantallaCompleta = useMediaQuery('(min-width:600px)')

  if (token === '') {
    return <Navigate to='/' />
  }

  return (
    <Box
      display={pantallaCompleta ? 'flex' : 'block'}
      width='100%'
      height='100%'
    >
      <SideBar />
      <Box flexGrow={1}>
        <NavBarProtegida />
        <Outlet />
      </Box>
    </Box>
  )
}
export default Protegido
