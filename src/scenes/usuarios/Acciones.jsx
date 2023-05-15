// ? IMPORTACIÓN DE PAQUETES
import { useNavigate } from 'react-router-dom'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Box, IconButton, Tooltip } from '@mui/material'
import { Delete, Edit, Preview } from '@mui/icons-material'

// ? IMPORTACIÓN DE COMPONENTES
import { useEliminarUsuario } from '../../hooks/useUsuarios'

const Acciones = ({ params }) => {
  // ? USO DE PAQUETES
  const navigate = useNavigate()
  const { mutate: eliminarUsuario } = useEliminarUsuario()

  return (
    <Box>
      <Tooltip title='View room details'>
        <IconButton
          onClick={() => {
            navigate(`/dashboard/usuario/${params.id}`)
          }}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title='Edit this room'>
        <IconButton onClick={() => console.log('editar')}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete this room'>
        <IconButton onClick={() => eliminarUsuario(params.id)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default Acciones
