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
// Importacion del SnackbarProvider
import { SnackbarProvider, closeSnackbar } from 'notistack'
// // Importación de las herramientas de React Query
// import { ReactQueryDevTools } from 'react-query/devtools'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

// ? IMPORTACIÓN DE ELEMENTOS
// Importacion del Router
import { router } from './router'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={6000}
        action={snackbarId => (
          <>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={() => closeSnackbar(snackbarId)}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </>
        )}
      >
        <RouterProvider router={router} />
      </SnackbarProvider>

      {/* <ReactQueryDevTools initialIsOpen={false} position='botton-rigth' /> */}
    </QueryClientProvider>
  </React.StrictMode>
)