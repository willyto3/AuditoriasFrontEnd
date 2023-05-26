// ? IMPORTACIÓN DE PAQUETES
// Importación del modulo Axios
import axios from 'axios'

// ? IMPORTACIÓN DE COMPONENTES
import { auditoriaStore } from '../store/auditoriaStore'

// Se coloca la URL como una constante
const BASE_URL = 'https://auditoriasbackend-production.up.railway.app/api/v1'
// const BASE_URL = 'http://localhost:5001/api/v1'

// Se genera la conexión por Axios con la base de Datos
const usuariosAPI = axios.create({
  baseURL: BASE_URL,
})

// Se crea y exporta el enlace para conectar a los usuarios
export const userUrlEndPoint = '/usuarios'

// Se exporta el token del Usuario
export const token = auditoriaStore.getState().token

// Se exporta el header
export const header = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
}

// ? OBTENER TODOS LOS USUARIOS
// Se crea y exporta la Función para obtener todos los usuarios
export const obtenerTodosLosUsuarios = async () => {
  const response = await usuariosAPI.get(userUrlEndPoint, { headers: header })
  return response.data
}

// ? OBTENER UN USUARIO
// Se crea y exporta la Función para obtener todos los usuarios
export const obtenerUnUsuario = async id => {
  const response = await usuariosAPI.get(`${userUrlEndPoint}/${id}`, {
    headers: header,
  })
  return response.data
}

// ? CREAR UN USUARIO
// Se crea y exporta la Función para añadir un usuario
export const registroUsuario = async formData => {
  const response = await usuariosAPI.post(`${userUrlEndPoint}`, formData, {
    headers: header,
  })
  return response.data
}

// ? ELIMINAR UN USUARIO
// Se crea y exporta la Función para eliminar un usuario
export const eliminarUsuario = async id => {
  const response = await usuariosAPI.delete(`${userUrlEndPoint}/${id}`, {
    data: { id },
    headers: header,
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
    headers: header,
  })
  return response.data
}

export default usuariosAPI
