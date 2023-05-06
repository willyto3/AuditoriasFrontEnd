// Importación de CSS
import './index.css'

// ? IMPORTACIÓN DE MODULOS
// Importacion de React y del ReactDOM
import React from 'react'
import ReactDOM from 'react-dom/client'
// Importacion del Router Provider
import { RouterProvider } from 'react-router-dom'
// Importacion de Preload de SWR
import { preload } from 'swr'

// ? IMPORTACIÓN DE ELEMENTOS
// Importacion del Router
import { router } from './router'
// Importacion de API
// Importamos las funciones de GetUser y el enlace de usuario
import {
  userUrlEndPoint as cacheKey,
  obtenerTodosLosUsuarios,
} from './api/users'

// Precargar la informacion de los usuarios
preload(cacheKey, obtenerTodosLosUsuarios)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
