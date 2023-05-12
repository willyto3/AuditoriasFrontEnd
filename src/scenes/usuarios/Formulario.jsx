// // ? IMPORTACIÓN DE MODULOS
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
// import {
//   Alert,
//   Box,
//   Button,
//   TextField,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material'
// import MenuItem from '@mui/material/MenuItem'
// import { Form, Formik } from 'formik'
// import { useState } from 'react'
// import Dropzone from 'react-dropzone'
// import { useNavigate } from 'react-router-dom'

// import toast, { Toaster } from 'react-hot-toast'

// // ? IMPORTACIÓN DE COMPONENTES
// import FlexBetween from '../../components/FlexBetween'
// import Header from '../../components/Header'
// // Importamos el esquema del formulario de Usuario
// import { esquemaIngreso, opcionesCargo, valoresIniciales } from './esquema'

// import { useCreate } from '../../api/usersSWR'

// // Importamos las funciones de registroUsuario
// import { registroUsuario } from '../../api/users'

// const Formulario = () => {
//   // Hacemos uso del UseSWR
//   const { mutate } = useCreate()

//   const { palette } = useTheme()
//   const navigate = useNavigate()
//   const pantallaCompleta = useMediaQuery('(min-width:600px')

//   // ? FUNCIONES
//   // Funcion para Registrar un Usuario
//   const registroUsuarioMutation = async (values, onsubmitProps) => {
//     try {
//       // this allows us to send form info with image
//       const formData = new FormData()

//       for (const value in values) {
//         formData.append(value, values[value])
//       }

//       formData.append('picturePath', values.picture.name)
//       await mutate(registroUsuario(formData))

//       toast.success(`Auditor Creado.`, {
//         duration: 6000,
//         icon: '🎉',
//       })
//       onsubmitProps.resetForm()
//       navigate('/dashboard')
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   // Funcion para manejar el boton del formulario
//   const manejoBoton = async (values, onsubmitProps) => {
//     await registroUsuarioMutation(values, onsubmitProps)
//   }

//   // Funcion para controlar los eventos en el input Cargo
//   const manejoInput = event => {
//     setCargo(event.target.value)
//   }

//   // ? USE STATE
//   const [cargo, setCargo] = useState('')
//   const [errorIngreso, setErrorIngreso] = useState('')

//   return (
//     <Box m='1rem 1rem'>
//       <Toaster toastOptions={{ position: 'top-center' }} />

//       <Header subtitle='Registro de Auditores' />
//       <Formik
//         onSubmit={manejoBoton}
//         initialValues={valoresIniciales}
//         validationSchema={esquemaIngreso}
//         validateOnChange={false}
//         enableReinitialize
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//           setFieldValue,
//         }) => (
//           <Form onSubmit={handleSubmit}>
//             <Box
//               display='grid'
//               gap='30px'
//               gridTemplateColumns='repeat(4,minmax(0,1fr))'
//               sx={{
//                 '& >div': {
//                   gridColumn: pantallaCompleta ? undefined : 'span 4',
//                 },
//               }}
//             >
//               <TextField
//                 label='Nombres'
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.nombres}
//                 name='nombres'
//                 error={Boolean(touched.nombres) && Boolean(errors.nombres)}
//                 helperText={touched.nombres && errors.nombres}
//                 sx={{ gridColumn: 'span 4' }}
//               />
//               <TextField
//                 label='Apellidos'
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.apellidos}
//                 name='apellidos'
//                 error={Boolean(touched.apellidos) && Boolean(errors.apellidos)}
//                 helperText={touched.apellidos && errors.apellidos}
//                 sx={{ gridColumn: 'span 4' }}
//               />
//               <TextField
//                 label='Documento'
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.documento}
//                 name='documento'
//                 error={Boolean(touched.documento) && Boolean(errors.documento)}
//                 helperText={touched.documento && errors.documento}
//                 sx={{ gridColumn: 'span 4' }}
//               />
//               <TextField
//                 label='Email'
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.email}
//                 name='email'
//                 error={Boolean(touched.email) && Boolean(errors.email)}
//                 helperText={touched.email && errors.email}
//                 sx={{ gridColumn: 'span 4' }}
//               />

//               <Box
//                 gridColumn='span 4'
//                 border={`1px solid ${palette.neutral.medium}`}
//                 borderRadius='5px'
//                 p='1rem'
//               >
//                 <Dropzone
//                   acceptedFiles='.jpg,.jpeg,.png'
//                   multiple={false}
//                   onDrop={acceptedFiles =>
//                     setFieldValue('picture', acceptedFiles[0])
//                   }
//                 >
//                   {({ getRootProps, getInputProps }) => (
//                     <Box
//                       {...getRootProps()}
//                       border={`2px dashed ${palette.primary.main}`}
//                       sx={{ '&:hover': { cursor: 'pointer' } }}
//                     >
//                       <input {...getInputProps()} />
//                       {!values.picture ? (
//                         <p>Elija la foto de Perfil</p>
//                       ) : (
//                         <FlexBetween>
//                           <Typography>{values.picture.name}</Typography>
//                           <EditOutlinedIcon />
//                         </FlexBetween>
//                       )}
//                     </Box>
//                   )}
//                 </Dropzone>
//               </Box>

//               <TextField
//                 select
//                 label='Selecciona el Cargo'
//                 type='text'
//                 onBlur={handleBlur}
//                 onChange={(manejoInput, handleChange)}
//                 value={(cargo, values.cargo)}
//                 name='cargo'
//                 error={Boolean(touched.cargo) && Boolean(errors.cargo)}
//                 helperText={touched.cargo && errors.cargo}
//                 sx={{ gridColumn: 'span 4' }}
//               >
//                 {opcionesCargo.map(item => (
//                   <MenuItem key={item} value={item}>
//                     {item}
//                   </MenuItem>
//                 ))}
//               </TextField>

//               <TextField
//                 label='Contraseña'
//                 type='password'
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.contrasena}
//                 name='contrasena'
//                 error={
//                   Boolean(touched.contrasena) && Boolean(errors.contrasena)
//                 }
//                 helperText={touched.contrasena && errors.contrasena}
//                 sx={{ gridColumn: 'span 4' }}
//               />
//               <TextField
//                 label='Confirmar Contraseña'
//                 type='password'
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.confirmarContrasena}
//                 name='confirmarContrasena'
//                 error={
//                   Boolean(touched.confirmarContrasena) &&
//                   Boolean(errors.confirmarContrasena)
//                 }
//                 helperText={
//                   touched.confirmarContrasena && errors.confirmarContrasena
//                 }
//                 sx={{ gridColumn: 'span 4' }}
//               />
//             </Box>

//             {/* BUTTONS */}
//             <Box>
//               <Button
//                 fullWidth
//                 type='submit'
//                 sx={{
//                   m: '2rem 0',
//                   p: '1rem',
//                   backgroundColor: palette.primary.main,
//                   color: palette.background.alt,
//                   '&:hover': { color: palette.primary.main },
//                 }}
//               >
//                 REGISTRO
//               </Button>
//               {errorIngreso ? (
//                 <Alert
//                   severity='error'
//                   sx={{ mb: '2rem', fontSize: 'large' }}
//                   onClose={() => {
//                     setErrorIngreso('')
//                   }}
//                 >
//                   {errorIngreso}
//                 </Alert>
//               ) : (
//                 ''
//               )}
//             </Box>
//           </Form>
//         )}
//       </Formik>
//     </Box>
//   )
// }
// export default Formulario
