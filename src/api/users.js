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

// ? OBTENER TODOS LOS USUARIOS
// Se crea y exporta la Función para obtener todos los usuarios
export const obtenerTodosLosUsuarios = async () => {
  try {
    const response = await usuariosAPI.get(userUrlEndPoint)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// ? CREAR UN USUARIO
// Se crea y exporta la Función para añadir un usuario
export const registroUsuario = async formData => {
  const response = await usuariosAPI.post(
    `${userUrlEndPoint}/registrousuario`,
    formData
  )
  return response.data
}

// ? ELIMINAR UN USUARIO
// Se crea y exporta la Función para eliminar un usuario
export const eliminarUsuario = async _id => {
  const response = await usuariosAPI.delete(userUrlEndPoint, {
    data: { _id },
  })

  return response.data
}

// Se crea y exporta la Función para actualizar un usuario
export const updateUser = async ({
  id,
  nombres,
  apellidos,
  documento,
  email,
  contrasena,
  cargo,
  picturePath,
  isActive,
}) => {
  const response = await usuariosAPI.patch(userUrlEndPoint, {
    id,
    nombres,
    apellidos,
    documento,
    email,
    contrasena,
    cargo,
    picturePath,
    isActive,
  })
  return response.data
}
