import { Box, Grid } from '@mui/material'

import Header from '../../components/Header'
import Formulario from './Formulario'


const RegistroUsuario = () => {
  return (
    <Box>
      <Header title='Auditores' subtitle='Crear Auditor'/>
      <Grid container>
        <Grid item md={12} m='0 2rem'>
          <Formulario />
        </Grid>
      </Grid>
    </Box>
  )
}
export default RegistroUsuario
