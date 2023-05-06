import { Box, Grid } from '@mui/material'

import Header from '../../components/Header'
import Tabla from './Tabla'

const Usuarios = () => {
  return (
    <Box m='1rem 1.5rem'>
      <Header title='Auditores' />
      <Grid container>
        <Grid item md={11}>
          <Tabla />
        </Grid>
        
      </Grid>
    </Box>
  )
}
export default Usuarios
