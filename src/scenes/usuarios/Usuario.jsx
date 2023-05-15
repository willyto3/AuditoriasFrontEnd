import { useParams } from 'react-router-dom'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Box, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

// ? IMPORTACION DE HOOKS
import { useUsuario } from '../../hooks/useUsuarios'

const Usuario = () => {
  // ? USO DE PAQUETES
  const { id } = useParams()
  // Query para buscar todos los Usuarios
  const { data, isLoading, isError, error } = useUsuario(id)

  // ? FUNCIONES
  // Se verifica si se esta cargando la información
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
        <Typography>Cargando...</Typography>
      </Box>
    )
  }

  // Se verifica si se presento un Error
  if (isError) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
        <Typography>{error.message}</Typography>
      </Box>
    )
  }
  return (
    <div>
      {data.nombres} -{data.apellidos} -{data.email} -{data.cargo} -
      {data.documento} -{data._id}
    </div>
  )
}
export default Usuario
