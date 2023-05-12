// Importación de CSS
import './index.css'

// ? IMPORTACIÓN DE MODULOS
// Importacion de React y del ReactDOM
import React from 'react'
import ReactDOM from 'react-dom/client'
// Importacion del Router Provider
import { RouterProvider } from 'react-router-dom'

// ? IMPORTACIÓN DE ELEMENTOS
// Importacion del Router
import { router } from './router'

import { SWRConfig } from 'swr'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <SWRConfig value={{ provider: () => new Map() }}>
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>
)
