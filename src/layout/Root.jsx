// ? IMPORTACIÓN DE PAQUETES
// Importacion de Outlet de React Router
import { Outlet } from 'react-router-dom'
// Importamos useMemo de React
import { useMemo } from 'react'
// Importamos CssBaseLine, Theme Provider y createTheme de mui Material
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material'

// ? IMPORTACIÓN DE ELEMENTOS
// Importamos themeSettings del arhivo theme
import { themeSettings } from '../theme'
// Importamos la auditoria Store
import { auditoriaStore } from '../store/auditoriaStore'

//! INICIO DEL COMPONENTE ROOT
const Root = () => {
  // ? FUNCIONES
  // se usa la tienda para elegir el valor del tema
  const mode = auditoriaStore(state => state.mode)
  // Funcion para cambiar el Tema
  let theme = useMemo(
    () => createTheme(themeSettings(mode)),
    [mode]
  )
  theme = responsiveFontSizes(theme)

  // ? VISUALIZACION
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  )
}
export default Root
