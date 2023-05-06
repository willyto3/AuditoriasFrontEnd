// ? IMPORTACIÓN DE MODULOS
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'

// ? IMPORTACIÓN DE COMPONENTES
import Formulario from './Formulario'

const Ingreso = () => {
  // Uso del Tema
  const tema = useTheme()
  // Constante para identificar si se encuentra en modo Movil
  const pantallaCompleta = useMediaQuery('(min-width:1000px)')

  return (
    <Box>
      <Box
        width={pantallaCompleta ? '50%' : '93%'}
        p='2rem'
        m='2rem auto'
        borderRadius='1.5rem'
        backgroundColor={tema.palette.background.alt}
      >
        <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
          Bienvenidos a Auditorias Paula
        </Typography>
        <Formulario />
      </Box>
    </Box>
  )
}
export default Ingreso
