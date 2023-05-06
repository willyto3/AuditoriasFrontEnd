import * as yup from 'yup'

export const esquemaIngreso = yup.object().shape({
  email: yup
    .string()
    .email('Por Favor Ingrese un Correo Electronico Válido')
    .required('El Correo Electronico es Requerido'),
  contrasena: yup
    .string()
    .required('Debe Asignar una Contraseña Válida')
    .min(5, 'La Contraseña debe ser de minimo cinco (5) caracteres'),
})

export const valoresIniciales = {
  email: '',
  contrasena: '',
}
