// ? IMPORTACIÓN DE PAQUETES
// Importacion de Outlet de React Router
import { Outlet } from 'react-router-dom'

// ? IMPORTACIÓN DE COMPONENTES
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

//! INICIO DEL COMPONENTE PUBLICO
const Publico = () => {
  // ? VISUALIZACION
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer/>
    </>
  )
}
export default Publico
