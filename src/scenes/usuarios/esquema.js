import * as yup from 'yup'

export const esquemaIngreso = yup.object().shape({
  nombres: yup
    .string()
    .required('El nombre es Requerido')
    .min(2, 'El Nombre debe tener minimo dos (2) caracteres'),
  apellidos: yup
    .string()
    .required('El Apellido es Requerido')
    .min(2, 'El Apellido debe tener minimo dos (2) caracteres'),
  documento: yup
    .string()
    .required('El Documento es Requerido')
    .min(2, 'El Documento debe tener minimo dos (2) caracteres'),
  email: yup
    .string()
    .email('Por Favor Ingrese un Correo Electronico Válido')
    .required('El Correo Electronico es Requerido'),
  cargo: yup.string().required('Por Favor Elige un Cargo'),
  contrasena: yup
    .string()
    .required('Debe Asignar una Contraseña Válida')
    .min(5, 'La Contraseña debe ser de minimo cinco (5) caracteres'),
  confirmarContrasena: yup
    .string()
    .oneOf([yup.ref('contrasena'), null], 'Las Contraseñas deben Coincidir')
    .min(5, 'La Contraseña debe ser de minimo cinco (5) caracteres')
    .required('Debe Asignar una Contraseña Válida'),
    rutaFoto:yup.string()
})

export const valoresIniciales = {
  email: '',
  contrasena: '',
  nombres: '',
  apellidos: '',
  documento: '',
  cargo: '',
  rutaFoto:'',
  confirmarContrasena:''
}

// Opciones de Selección
export const opcionesCargo = ['Auditor', 'Auditor Líder']
