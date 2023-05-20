// ? IMPORTACIÓN DE PAQUETES
// Importacion de createBrowser Router
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

// ? IMPORTACIÓN DE LAYOUTS
import Protegido from '../layout/Protegido'
import Publico from '../layout/Publico'
import Root from '../layout/Root'

// ? IMPORTACIÓN DE PAGINAS
import DashBoard from '../scenes/dashboard'
import Error404 from '../scenes/error404'
import Ingreso from '../scenes/ingreso'
import Inicio from '../scenes/inicio'
import Usuarios from '../scenes/usuarios'
import RegistroUsuario from '../scenes/usuarios/RegistroUsuario'
import Usuario from '../scenes/usuarios/Usuario'
import Nosotros from '../scenes/nosotros'
import Servicios from '../scenes/servicios'
import Contactanos from '../scenes/contactanos'
import Clients from '../scenes/clients'

// Función Router
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} errorElement={<Error404 />}>
      <Route path='/' element={<Publico />}>
        <Route index element={<Inicio />} />
        <Route path='nosotros' element={<Nosotros />} />
        <Route path='servicios' element={<Servicios />} />
        <Route path='contactanos' element={<Contactanos />} />
        <Route path='ingresa' element={<Ingreso />} />
      </Route>
      <Route path='dashboard' element={<Protegido />}>
        <Route index element={<DashBoard />} />
        <Route path='listado' element={<Usuarios />}/>
        <Route path='registro' element={<RegistroUsuario />} />
        <Route path='usuario/:id' element={<Usuario />} />
        <Route path='clientlist' element={<Clients />}/>
      </Route>
    </Route>
  )
)
