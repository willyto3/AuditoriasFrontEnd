// ? IMPORTACIÓN DE PAQUETES
import { Form, Formik } from 'formik'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

// ? IMPORTACIÓN DE COMPONENTES
import FlexBetween from '../../components/FlexBetween'
// Importamos el esquema del formulario de Usuario
import { esquemaIngreso, opcionesCargo, valoresIniciales } from './esquema'
import { useRegistroUsuario } from '../../hooks/useUsuarios'
import { tokens } from '../../theme'

// ! COMIENZO DEL COMPONENTE
const Formulario = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const pantallaCompleta = useMediaQuery('(min-width:600px')
  const { mutate: anadirUsuario } = useRegistroUsuario()
  const theme = useTheme()
  // Creamos constantes para los colores
  const colors = tokens(theme.palette.mode)

  // ? FUNCIONES
  // Funcion para registrar un usuario
  const registrarUsuario = async (values, onsubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData()

    for (const value in values) {
      formData.append(value, values[value])
    }

    formData.append('picturePath', values.picture.name)

    anadirUsuario(formData)
    enqueueSnackbar(
      `Se creo el Auditor ${values.nombres} ${values.apellidos}`,
      {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      }
    )
    onsubmitProps.resetForm()
    navigate('/dashboard')
  }

  // Funcion para controlar los eventos en el input Cargo
  const manejoInput = event => {
    setCargo(event.target.value)
  }

  // ? USE STATE
  const [cargo, setCargo] = useState('')

  return (
    <Box m='1rem 1rem'>
      <Formik
        onSubmit={registrarUsuario}
        initialValues={valoresIniciales}
        validationSchema={esquemaIngreso}
        validateOnChange={false}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4,minmax(0, 1fr))'
              sx={{
                '& >div': {
                  gridColumn: pantallaCompleta ? undefined : 'span 4',
                },
              }}
            >
              <TextField
                required
                label='Nombres'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombres}
                name='nombres'
                error={Boolean(touched.nombres) && Boolean(errors.nombres)}
                helperText={touched.nombres && errors.nombres}
                color='secondary'
                backgroundColor='transparent'
                inputProps={{
                  style: { color: colors.greenAccent[500], fontSize: '20px' },
                }}
                sx={{ gridColumn: 'span 2', fontSize: '18px' }}
              />
              <TextField
                required
                label='Apellidos'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.apellidos}
                name='apellidos'
                error={Boolean(touched.apellidos) && Boolean(errors.apellidos)}
                helperText={touched.apellidos && errors.apellidos}
                color='secondary'
                backgroundColor='transparent'
                inputProps={{
                  style: { color: colors.greenAccent[500], fontSize: '20px' },
                }}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                required
                label='Documento'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.documento}
                name='documento'
                error={Boolean(touched.documento) && Boolean(errors.documento)}
                helperText={touched.documento && errors.documento}
                color='secondary'
                backgroundColor='transparent'
                inputProps={{
                  style: { color: colors.greenAccent[500], fontSize: '20px' },
                }}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                required
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name='email'
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                color='secondary'
                backgroundColor='transparent'
                inputProps={{
                  style: { color: colors.greenAccent[500], fontSize: '20px' },
                }}
                sx={{ gridColumn: 'span 2' }}
              />

              <Box gridColumn='span 2'>
                <Dropzone
                  acceptedFiles='.jpg,.jpeg,.png'
                  multiple={false}
                  onDrop={acceptedFiles =>
                    setFieldValue('picture', acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      borderRadius='5px'
                      border={`2px dashed ${colors.grey[100]}`}
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                      p='0 1rem'
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p>Elija la foto de Perfil</p>
                      ) : (
                        <FlexBetween>
                          <p>{values.picture.name}</p>
                          <EditOutlinedIcon />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>

              <TextField
                required
                select
                label='Selecciona el Cargo'
                type='text'
                onBlur={handleBlur}
                onChange={(manejoInput, handleChange)}
                value={(cargo, values.cargo)}
                name='cargo'
                error={Boolean(touched.cargo) && Boolean(errors.cargo)}
                helperText={touched.cargo && errors.cargo}
                color='secondary'
                backgroundColor='transparent'
                inputProps={{
                  style: { color: colors.greenAccent[500], fontSize: '20px' },
                }}
                sx={{ gridColumn: 'span 2' }}
              >
                {opcionesCargo.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                label='Contraseña'
                type='password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contrasena}
                name='contrasena'
                error={
                  Boolean(touched.contrasena) && Boolean(errors.contrasena)
                }
                helperText={touched.contrasena && errors.contrasena}
                color='secondary'
                backgroundColor='transparent'
                inputProps={{
                  style: { color: colors.greenAccent[500], fontSize: '20px' },
                }}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                required
                label='Confirmar Contraseña'
                type='password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmarContrasena}
                name='confirmarContrasena'
                error={
                  Boolean(touched.confirmarContrasena) &&
                  Boolean(errors.confirmarContrasena)
                }
                helperText={
                  touched.confirmarContrasena && errors.confirmarContrasena
                }
                color='secondary'
                backgroundColor='transparent'
                inputProps={{
                  style: { color: colors.greenAccent[500], fontSize: '20px' },
                }}
                sx={{ gridColumn: 'span 2' }}
              />
            </Box>

            {/* BUTTONS */}
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4,minmax(0, 1fr))'
              sx={{
                '& >div': {
                  gridColumn: pantallaCompleta ? undefined : 'span 4',
                },
              }}
            >
              <Button
                onClick={resetForm}
                sx={{
                  gridColumn: 'span 2',
                  m: '2rem 0',
                  p: '1rem',
                  backgroundColor: colors.greenAccent[500],
                  color: colors.primary[500],
                  '&:hover': { color: colors.blueAccent[300] },
                }}
              >
                <Typography variant='h5'>LIMPIAR FORMULARIO</Typography>
              </Button>

              <Button
                type='submit'
                sx={{
                  gridColumn: 'span 2',
                  m: '2rem 0',
                  p: '1rem',
                  backgroundColor: colors.greenAccent[500],
                  color: colors.primary[500],
                  '&:hover': { color: colors.redAccent[400] },
                }}
              >
                <Typography variant='h5'>REGISTRO</Typography>
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
export default Formulario
