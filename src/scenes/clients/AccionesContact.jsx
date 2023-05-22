// ? IMPORTACIÓN DE PAQUETES
import { useState } from 'react'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Box, IconButton, Tooltip, useTheme } from '@mui/material'
import { Delete } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// ? IMPORTACIÓN DE COMPONENTES
import { useEliminarUsuario } from '../../hooks/useUsuarios'
import { auditoriaStore } from '../../store/auditoriaStore'
import { tokens } from '../../theme'

const ContactActions = ({ params }) => {
  // ? USO DE PAQUETES
  const { mutate: eliminarUsuario } = useEliminarUsuario()
  // se usa la tienda para conocer el valor del usuario
  const usuario = auditoriaStore(state => state.usuario)
  // se usa la tienda para conocer el valor del usuario
  const token = auditoriaStore(state => state.token)
  // Uso del Tema
  const theme = useTheme()
  // Creamos constantes para los colores
  const colors = tokens(theme.palette.mode)

  const [open, setOpen] = useState(false)

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
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => eliminarUsuario(params.id, token)} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {usuario.rol !== 'Usuario' && (
        <Tooltip title='Eliminar Cliente'>
          <IconButton onClick={handleClickOpen}>
            <Delete sx={{ color: colors.redAccent[400], fontSize: '1.5rem' }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}

export default ContactActions
