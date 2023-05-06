// ? IMPORTACIÓN DE MODULOS
import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ? IMPORTACIÓN DE COMPONENTES
// Importamos el esquema del formulario de Usuario
import { esquemaIngreso, valoresIniciales } from './esquema'
// Importamos la tienda
import { auditoriaStore } from '../../store/auditoriaStore'

const Formulario = () => {
  // se usa la tienda para darle valor al token
  const setToken = auditoriaStore(state => state.setToken)
  // se usa la tienda para darle valor al usuario
  const setUsuario = auditoriaStore(state => state.setUsuario)

  const { palette } = useTheme()
  const navigate = useNavigate()
  const pantallaCompleta = useMediaQuery('(min-width:600px')

  // ? USE STATE
  const [errorIngreso, setErrorIngreso] = useState('')

  const ingreso = async (values, onsubmitProps) => {
    const respuestaIngreso = await fetch(
      'http://localhost:5001/api/v1/usuarios/ingresousuario',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      }
    )

    const ingresado = await respuestaIngreso.json()

    if (ingresado.ok) {
      setToken(ingresado.token)
      setUsuario(ingresado.usuario)

      onsubmitProps.resetForm()
      navigate('/dashboard')
    } else {
      setErrorIngreso(ingresado.mensaje)
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
              value={values.email}
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
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              LOGIN
            </Button>
            {errorIngreso ? (
              <Alert
                severity='error'
                sx={{ mb: '2rem', fontSize: 'large' }}
                onClose={() => {
                  setErrorIngreso('')
                }}
              >
                {errorIngreso}
              </Alert>
            ) : (
              ''
            )}

            <Typography
              onClick={() => {
                resetForm()
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: palette.primary.light,
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
