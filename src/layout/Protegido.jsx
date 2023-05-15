// ? IMPORTACIÓN DE PAQUETES
// Importacion de Outlet de React Router
import { Navigate, Outlet } from 'react-router-dom'
// Importamos useMemo de React
import { useState } from 'react'
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

  const [abiertaSideBar, setAbiertaSideBar] = useState(true)

  if (token === '') {
    return <Navigate to='/' />
  }

  return (
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
  )
}
export default Protegido
