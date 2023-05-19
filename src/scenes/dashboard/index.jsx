// ? IMPORTACIÓN DE MODULOS
import { Box, Button } from '@mui/material'
import { useSnackbar } from 'notistack'

// ? IMPORTACIÓN DE COMPONENTES
// import { auditoriaStore } from '../../store/auditoriaStore'
import Header from '../../components/Header'

const DashBoard = () => {
  const { enqueueSnackbar } = useSnackbar()

  // // se usa la tienda para conocer el valor del usuario
  // const usuario = auditoriaStore(state => state.usuario)

  const handleClick = () => {
    enqueueSnackbar('Este es un Mensaje de Prueba', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    })
  }

  return (
    <Box>
      <Header title='Dashboard' subtitle='Bienvenido a tu Dashboard' />
      <Button onClick={handleClick}>Open simple snackbar</Button>
    </Box>
  )
}
export default DashBoard
