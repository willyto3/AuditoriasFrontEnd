// ? IMPORTACIÓN DE PAQUETES
import { Box, Grid } from '@mui/material'

// ? IMPORTACIÓN DE COMPONENTES
import Tabla from './Tabla'
import Header from '../../components/Header'

const Clients = () => {
  return (
    <Box m='0 0.5rem'>
      <Header title='Clientes' subtitle='Listado de Clientes' />
      <Grid container>
        <Grid item md={12}>
          <Tabla />
        </Grid>
      </Grid>
    </Box>
  )
}
export default Clients
