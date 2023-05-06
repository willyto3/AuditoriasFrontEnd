import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { forwardRef, useState } from 'react'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Alerta = ({ mensaje }) => {
  const [open, setOpen] = useState(true)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} sx={{ width: '100%' }}>
        {mensaje}
      </Alert>
    </Snackbar>
  )
}
export default Alerta
