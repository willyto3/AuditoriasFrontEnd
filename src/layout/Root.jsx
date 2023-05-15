// ? IMPORTACIÓN DE PAQUETES
// Importacion de Outlet de React Router
import { Outlet } from 'react-router-dom'
// Importamos useMemo de React
import { useMemo } from 'react'
// Importamos CssBaseLine, Theme Provider y createTheme de mui Material
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

// ? IMPORTACIÓN DE ELEMENTOS
// Importamos themeSettings del arhivo theme
import { themeSettings } from '../theme'
// Importamos la auditoria Store
import { auditoriaStore } from '../store/auditoriaStore'

//! INICIO DEL COMPONENTE ROOT
const Root = () => {
  // ? FUNCIONES
  // se usa la tienda para elegir el valor del tema
  const eleccionTema = auditoriaStore(state => state.eleccionTema)
  // Funcion para cambiar el Tema
  const tema = useMemo(
    () => createTheme(themeSettings(eleccionTema)),
    [eleccionTema]
  )

  // ? VISUALIZACION
  return (
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  )
}
export default Root
