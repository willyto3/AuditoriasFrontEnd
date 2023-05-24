// ? IMPORTACIÓN DE PAQUETES
// Importación del modulo Axios
import axios from 'axios'

// Se coloca la URL como una constante
// const BASE_URL = 'https://auditoriasbackend-production.up.railway.app/api/v1'
const BASE_URL = 'http://localhost:5001/api/v1'

// Se genera la conexión por Axios con la base de Datos
const usuariosAPI = axios.create({
  baseURL: BASE_URL,
})

// Se crea y exporta el enlace para conectar a los usuarios
export const userUrlEndPoint = '/usuarios'

// ? OBTENER TODOS LOS USUARIOS
// Se crea y exporta la Función para obtener todos los usuarios
export const obtenerTodosLosUsuarios = async token => {
  console.log(token)
  const header = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  }
  const response = await usuariosAPI.get(userUrlEndPoint, { headers: header })
  console.log(response.data)
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
