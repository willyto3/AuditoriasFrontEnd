// ? IMPORTACIÓN DE PAQUETES
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
// Importación del modulo JWT Decode
import jwtDecode from 'jwt-decode'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

// ? IMPORTACIÓN DE COMPONENTES
// Importamos el esquema del formulario de Usuario
import { esquemaIngreso, valoresIniciales } from './esquema'
// Importamos la tienda
import { auditoriaStore } from '../../store/auditoriaStore'
import { tokens } from '../../theme'
import { ingresoUsuario } from '../../api/auth'

// ! COMIENZO DEL COMPONENTE
const Formulario = () => {
  const { enqueueSnackbar } = useSnackbar()
  // se usa la tienda para darle valor al token
  const setToken = auditoriaStore(state => state.setToken)
  // se usa la tienda para darle valor al usuario
  const setUsuario = auditoriaStore(state => state.setUsuario)
  const setColumnVisibilityModel = auditoriaStore(
    state => state.setColumnVisibilityModel
  )

  const theme = useTheme()
  const navigate = useNavigate()
  // Creamos constantes para los colores
  const colors = tokens(theme.palette.mode)
  const pantallaCompleta = useMediaQuery('(min-width:600px')

  const ingreso = async (values, onsubmitProps) => {
    const response = await ingresoUsuario(values)

    if (response.accessToken) {
      setToken(response.accessToken)
      const usuario = jwtDecode(response.accessToken)

      setUsuario(usuario.UserInfo)
      setColumnVisibilityModel(usuario.UserInfo)
      enqueueSnackbar(
        `Bienvenido Nuevamente ${usuario.UserInfo.nombres} ${usuario.UserInfo.apellidos}`,
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
    } else {
      enqueueSnackbar(`${response.mensaje}`, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }

  const manejoBoton = async (values, onsubmitProps) => {
    await ingreso(values, onsubmitProps)
  }

  return (
    <Formik
      onSubmit={manejoBoton}
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
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(4,minmax(0,1fr))'
            sx={{
              '& >div': {
                gridColumn: pantallaCompleta ? undefined : 'span 4',
              },
            }}
          >
            <TextField
              label='Email'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email.toLowerCase()}
              name='email'
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              label='Contraseña'
              type='password'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contrasena}
              name='contrasena'
              error={Boolean(touched.contrasena) && Boolean(errors.contrasena)}
              helperText={touched.contrasena && errors.contrasena}
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type='submit'
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: colors.greenAccent[400],
                color: colors.grey[100],
                '&:hover': { color: colors.redAccent[400] },
              }}
            >
              LOGIN
            </Button>

            <Typography
              onClick={() => {
                resetForm()
              }}
              sx={{
                textDecoration: 'underline',
                color: colors.grey[100],
                '&:hover': {
                  cursor: 'pointer',
                  color: colors.greenAccent[400],
                },
              }}
            >
              Solicita una Cuenta.
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}
export default Formulario
