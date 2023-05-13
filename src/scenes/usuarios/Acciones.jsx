import { useNavigate } from 'react-router-dom'
import { Box, IconButton, Tooltip } from '@mui/material'
import { Delete, Edit, Preview } from '@mui/icons-material'

const Acciones = ({ params }) => {
  const navigate = useNavigate()

  return (
    <Box>
      <Tooltip title='View room details'>
        <IconButton conButton onClick={() => navigate(`usuario/${params.id}`)}>
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title='Edit this room'>
        <IconButton onClick={() => console.log('editar')}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete this room'>
        <IconButton onClick={() => console.log('eliminar')}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default Acciones
