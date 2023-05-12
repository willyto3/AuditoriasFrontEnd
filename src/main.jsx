// Importación de CSS
import './index.css'

// ? IMPORTACIÓN DE MODULOS
// Importacion de React y del ReactDOM
import React from 'react'
import ReactDOM from 'react-dom/client'
// Importacion del Router Provider
import { RouterProvider } from 'react-router-dom'
// Importacion del Query Provider
import { QueryClientProvider, QueryClient } from 'react-query'

// ? IMPORTACIÓN DE ELEMENTOS
// Importacion del Router
import { router } from './router'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
