import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button } from '@mui/material'

import toast, { Toaster } from 'react-hot-toast'

import DataTable from 'react-data-table-component'

// import Dialog from '@mui/material/Dialog'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import DialogContentText from '@mui/material/DialogContentText'
// import DialogTitle from '@mui/material/DialogTitle'

import Header from '../../components/Header'

// import Alerta from '../../components/Alerta'

// ? IMPORTACIÓN DE COMPONENTES

import { useDelete, useUsers } from '../../api/usersSWR'

// Importamos las funciones de registroUsuario
import { useMemo } from 'react'
import { eliminarUsuario } from '../../api/users'

const Tabla = () => {
  const { usuarios, isLoading, isError, isValidating } = useUsers()

  const { mutate } = useDelete()

  // Comprobamos si se presento un error al ejecutar la función
  if (isError) {
    return <h2>{isError}</h2>
  }

  // const handleClose = () => {
  //   // setAbierto(false)
  //   // setEleccion(false)
  // }

  // ? FUNCIONES
  // Funcion para Registrar un Usuario
  const eliminarUsuarioMutation = async _id => {
    try {
      await mutate(eliminarUsuario(_id))

      toast.success(`Auditor Creado.`, {
        duration: 6000,
        icon: '🎉',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const manejoBoton = async values => {
    // setAbierto(true)

    eliminarUsuarioMutation(values)

    // handleClose()
  }

  const columns = useMemo(
    () => [
      { name: 'Documento', selector: row => row.documento, sortable: true },
      { name: 'Nombres', selector: row => row.nombres, sortable: true },
      { name: 'Apellidos', selector: row => row.apellidos, sortable: true },
      { name: 'email', selector: row => row.email, sortable: true },
      {
        cell: row => (
          <Button onClick={() => console.log(`ACTUALIZAR ${row._id}`)}>
            <EditIcon />
          </Button>
        ),
      },
      {
        cell: row => (
          <Button onClick={() => manejoBoton(row._id)}>
            <DeleteIcon />
          </Button>
        ),
      },
    ],
    []
  )

  return (
    <Box>
      <Toaster toastOptions={{ position: 'top-center' }} />

      {/* {eliminacion ? <Alerta mensaje={eliminacion} severity='success' /> : ''}
      {abierto ? (
        <Dialog
          open={abierto}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {'Desea Eliminar un Auditor?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {`Deseas eliminar el Auditor.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={setEleccion(true)} autoFocus>
              Si
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ''
      )} */}
      <Header subtitle='Lista de Auditores' />
      <Box mt='10px' height='70vh'>
        {isValidating ? (
          <span>Validando</span>
        ) : (
          <DataTable
            pagination
            columns={columns}
            data={usuarios}
            progressPending={isLoading}
          />
        )}
      </Box>
    </Box>
  )
}
export default Tabla
