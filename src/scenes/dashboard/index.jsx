// ? IMPORTACIÓN DE MODULOS
// Importamos la tienda
import { Box } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'
import { auditoriaStore } from '../../store/auditoriaStore'

// ? IMPORTACIÓN DE COMPONENTES

const DashBoard = () => {
  // se usa la tienda para conocer el valor del usuario
  const usuario = auditoriaStore(state => state.usuario)

  return (
    <Box>
      {usuario
        ? toast.success(`Bienvenido ${usuario.nombres} ${usuario.apellidos}.`, {
            duration: 6000,
            icon: '🎉',
          })
        : ''}

      <h1>Dashboard</h1>
      <Toaster toastOptions={{ position: 'top-center' }} />
    </Box>
  )
}
export default DashBoard
