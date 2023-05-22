// ? IMPORTACIÓN DE PAQUETES
import { useNavigate } from 'react-router-dom'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Box, Divider, Grid, Paper, Typography, useTheme } from '@mui/material'

// ? IMPORTACIÓN DE COMPONENTES
import { tokens } from '../theme'

//! INICIO DEL COMPONENTE
const Footer = () => {
  // Usamos la navegacion
  const navigate = useNavigate()
  // Uso del Tema
  const theme = useTheme()
  // Creamos constantes para los colores
  const colors = tokens(theme.palette.mode)

  return (
    <Box sx={{ backgroundColor: colors.primary[400] }}>
      <Paper>
        <Grid
          container
          p='0.5rem 0'
          spacing={1}
          alignContent='center'
          justifyContent='center'
          gap='2rem'
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <Grid item xs={10} sm={5}>
            <Typography
              fontWeight='bold'
              variant='h5'
              lineHeight='1'
              component='div'
              color={colors.grey[100]}
              mb='0.5rem'
              sx={{
                flexGrow: 1,
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={() => navigate('/')}
            >
              Auditorias Paula
            </Typography>
            <Typography variant='body1' component='div' align='justify'>
              Somos la solución para ayudarte con la certificación de tus
              procesos.
            </Typography>
          </Grid>

          <Grid item xs={10} sm={3} display='flex' alignSelf='center'>
            <Typography
              fontWeight='bold'
              variant='h5'
              lineHeight='1'
              component='div'
              color={colors.grey[100]}
              mb='0.5rem'
              sx={{
                flexGrow: 1,
              }}
            >
              Redes Sociales
            </Typography>
            <Grid container>
              <Grid item xs={3}>
                <LinkedInIcon
                  onClick={() =>
                    window.open(
                      'https://www.linkedin.com/in/ing-quimico-willy-corzo/',
                      '_blank'
                    )
                  }
                  sx={{
                    fontSize: '38px',
                    flexGrow: 1,
                    '&:hover': {
                      color: '#0e76a8',
                      cursor: 'pointer',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <GitHubIcon
                  onClick={() =>
                    window.open('https://github.com/willyto3', '_blank')
                  }
                  sx={{
                    fontSize: '38px',
                    flexGrow: 1,
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <WhatsAppIcon
                  onClick={() =>
                    window.open(
                      'https://api.whatsapp.com/send?phone=573017893883&text=Me%20interesa%20Saber%20m%C3%A1s%20sobre%20tu%20Hoja%20de%20Vida',
                      '_blank'
                    )
                  }
                  sx={{
                    fontSize: '38px',
                    flexGrow: 1,
                    '&:hover': {
                      color: '#00bb2d',
                      cursor: 'pointer',
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Divider />
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        mt='0.5rem'
        pb='0.5rem'
      >
        <Typography variant='caption' color={colors.grey[100]}>
          Made With 💖 by Black Dog Solutions
        </Typography>
        <Typography variant='caption' color={colors.grey[100]}>
          {`Todos los derechos reservados. @ ${new Date().getFullYear()}`}
        </Typography>
      </Box>
    </Box>
  )
}
export default Footer
