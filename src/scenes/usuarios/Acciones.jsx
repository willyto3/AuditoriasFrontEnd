// ? IMPORTACIÓN DE PAQUETES
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Box, IconButton, Tooltip } from '@mui/material'
import { Delete, Preview } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// ? IMPORTACIÓN DE COMPONENTES
import { useEliminarUsuario } from '../../hooks/useUsuarios'

const Acciones = ({ params }) => {
  // ? USO DE PAQUETES
  const navigate = useNavigate()
  const { mutate: eliminarUsuario } = useEliminarUsuario()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Eliminar Auditor'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            ¿Esta Seguro de Eliminar este Auditor?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => eliminarUsuario(params.id)} autoFocus>
            Si
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title='Ver Detalles del Auditor'>
        <IconButton
          onClick={() => {
            navigate(`/dashboard/usuario/${params.id}`)
          }}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title='Eliminar Auditor'>
        <IconButton onClick={handleClickOpen}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default Acciones
