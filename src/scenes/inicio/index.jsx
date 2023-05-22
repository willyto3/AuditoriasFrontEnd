// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Box, Container, Stack, Typography, useTheme } from '@mui/material'

// ? IMPORTACIÓN DE COMPONENTES
import { tokens } from '../../theme'

const Inicio = () => {
  // ? CONSTANTES
  const theme = useTheme()
  // Creamos constantes para los colores
  const colors = tokens(theme.palette.mode)

  return (
    <Box
      display='flex'
      sx={{
        backgroundImage: 'url(background.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: '0.9',
        width: '100wh',
        height: '74vh',
        zIndex: -10,
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <Container
        sx={{
          height: '30vh',
          mt: 8,
          maxWidth: '90rem',
          ml: '4rem',
        }}
      >
        <Stack sx={{ height: '100%' }} justifyContent='center'>
          <Typography
            variant='h1'
            color='#1F2A40'
            sx={{ letterSpacing: '0.02em', mb: 1 }}
          >
            Mejorar tus Procesos
          </Typography>

          <Typography
            variant='h2'
            color='#1D1D42'
            sx={{ fontWeight: 500, letterSpacing: '0.05em', mb: 5 }}
          >
            Es Nuestra Pasión.
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
export default Inicio
