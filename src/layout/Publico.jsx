// ? IMPORTACIÓN DE PAQUETES
// Importacion de Outlet de React Router
import { Outlet } from 'react-router-dom'

// ? IMPORTACIÓN DE COMPONENTES
import NavBar from '../components/NavBar'

//! INICIO DEL COMPONENTE PUBLICO
const Publico = () => {
  // ? VISUALIZACION
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
export default Publico
