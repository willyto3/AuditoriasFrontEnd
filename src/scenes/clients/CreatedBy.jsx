// ? IMPORTACIÓN DE PAQUETES

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Box, Tooltip, Avatar, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

// ? IMPORTACIÓN DE COMPONENTES

// ? IMPORTACION DE HOOKS
import { useUsuario } from '../../hooks/useUsuarios'

const CreatedBy = ({ params }) => {
  // ? USO DE PAQUETES
  // Query para buscar un Usuario
  const { data, isLoading, isError, error } = useUsuario(params.row.createdBy)

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
    <Box display='flex' alignItems='center'>
      <Tooltip title={`${data.nombres} ${data.apellidos}`}>
        <Avatar src={`http://localhost:5001/images/${data.picturePath}`} />
      </Tooltip>
      <Typography ml='5px'>
        {data.nombres} {data.apellidos}
      </Typography>
    </Box>
  )
}
export default CreatedBy
