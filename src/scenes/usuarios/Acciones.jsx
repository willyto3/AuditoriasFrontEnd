import { Box, IconButton, Tooltip } from '@mui/material'
import { Delete, Edit, Preview } from '@mui/icons-material'

const Acciones = ({ params }) => {
  return (
    <Box>
      <Tooltip title='View room details'>
        <IconButton onClick={() => console.log('ver')}>
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
