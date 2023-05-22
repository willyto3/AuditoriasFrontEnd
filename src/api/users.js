// ? IMPORTACIÓN DE PAQUETES
// Importación del modulo Axios
import axios from 'axios'

// Se coloca la URL como una constante
const BASE_URL = 'http://localhost:5001/api/v1'

// Se genera la conexión por Axios con la base de Datos
const usuariosAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

// Se crea y exporta el enlace para conectar a los usuarios
export const userUrlEndPoint = '/usuarios'

// ? INGRESO DE UN USUARIO
// Se crea y exporta la funcion para manejar el ingreso de un usuario
export const ingresoUsuario = async values => {
  try {
    const response = await usuariosAPI.post(
      `${userUrlEndPoint}/ingresousuario`,
      values
    )
    return response.data
  } catch (error) {
    return error.response.data
  }
}

// ? OBTENER TODOS LOS USUARIOS
// Se crea y exporta la Función para obtener todos los usuarios
export const obtenerTodosLosUsuarios = async () => {
  const response = await usuariosAPI.get(userUrlEndPoint)
  return response.data
}

// ? OBTENER UN USUARIO
// Se crea y exporta la Función para obtener todos los usuarios
export const obtenerUnUsuario = async id => {
  const response = await usuariosAPI.get(`${userUrlEndPoint}/${id}`)
  return response.data
}

// ? CREAR UN USUARIO
// Se crea y exporta la Función para añadir un usuario
export const registroUsuario = async formData => {
  const response = await usuariosAPI.post(`${userUrlEndPoint}`, formData)
  return response.data
}

// ? ELIMINAR UN USUARIO
// Se crea y exporta la Función para eliminar un usuario
export const eliminarUsuario = async id => {
  const response = await usuariosAPI.delete(`${userUrlEndPoint}/${id}`, {
    data: { id },
  })

  return response.data
}

// ? ACTUALIZAR UN USUARIO
// Se crea y exporta la Función para actualizar un usuario
export const actualizarUsuario = async ({
  id,
  nombres,
  apellidos,
  documento,
  email,
  contrasena,
  cargo,
  picturePath,
}) => {
  const response = await usuariosAPI.patch(`${userUrlEndPoint}/${id}`, {
    id,
    nombres,
    apellidos,
    documento,
    email,
    contrasena,
    cargo,
    picturePath,
  })
  return response.data
}

export default usuariosAPI
