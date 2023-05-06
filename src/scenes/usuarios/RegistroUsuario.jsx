import { Box, Grid } from '@mui/material'

import Header from '../../components/Header'
import Formulario from './Formulario'


const RegistroUsuario = () => {
  return (
    <Box m='1rem 1.5rem'>
      <Header title='Auditores' />
      <Grid container>
        <Grid item md={4}>
          <Formulario />
        </Grid>
      </Grid>
    </Box>
  )
}
export default RegistroUsuario
