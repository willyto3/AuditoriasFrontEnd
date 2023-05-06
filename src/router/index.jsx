// ? IMPORTACIÓN DE MODULOS
// Importacion de createBrowser Router
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

// ? IMPORTACIÓN DE SCENES
// Importacion de Layouts
import Protegido from '../layout/Protegido'
import Publico from '../layout/Publico'

// Importación de Paginas
import DashBoard from '../scenes/dashboard'
import Error404 from '../scenes/error404'
import Ingreso from '../scenes/ingreso'
import Inicio from '../scenes/inicio'
import Usuarios from '../scenes/usuarios'
import RegistroUsuario from '../scenes/usuarios/RegistroUsuario'

// Función Router
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Publico />}>
        <Route index element={<Inicio />} />
        <Route path='ingresa' element={<Ingreso />} />
      </Route>
      <Route path='dashboard' element={<Protegido />}>
        <Route index element={<DashBoard />} />
        <Route path='listado' element={<Usuarios />} />
        <Route path='registro' element={<RegistroUsuario />} />
      </Route>
      <Route path='*' element={<Error404 />} />
    </Route>
  )
)
