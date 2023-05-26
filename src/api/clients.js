// ? IMPORTACIÓN DE PAQUETES
// Importación del modulo Axios
import axios from 'axios'

// ? IMPORTACIÓN DE COMPONENTES
import { auditoriaStore } from '../store/auditoriaStore'

// Se exporta el token del Usuario
export const token = auditoriaStore.getState().token

// Se exporta el header
export const header = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
}

// Se coloca la URL como una constante
const BASE_URL = 'https://auditoriasbackend-production.up.railway.app/api/v1'
// const BASE_URL = 'http://localhost:5001/api/v1'

// Se genera la conexión por Axios con la base de Datos
const clientsAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

// Se crea y exporta el enlace para conectar a los clientes
export const userUrlEndPoint = '/clients'

// ? OBTENER TODOS LOS CLIENTES
// Se crea y exporta la Función para obtener todos los clientes
export const getAllClients = async () => {
  const response = await clientsAPI.get(userUrlEndPoint, { headers: header })
  return response.data
}

// ? OBTENER UN CLIENTE
// Se crea y exporta la Función para obtener un Cliente
export const getAClient = async id => {
  const response = await clientsAPI.get(`${userUrlEndPoint}/${id}`, { headers: header })
  return response.data
}

// // ? CREAR UN USUARIO
// // Se crea y exporta la Función para añadir un usuario
// export const registroUsuario = async formData => {
//   const response = await clientsAPI.post(`${userUrlEndPoint}`, formData)
//   return response.data
// }

// // ? ELIMINAR UN USUARIO
// // Se crea y exporta la Función para eliminar un usuario
// export const eliminarUsuario = async id => {
//   const response = await clientsAPI.delete(`${userUrlEndPoint}/${id}`, {
//     data: { id },
//   })

//   return response.data
// }

// // ? ACTUALIZAR UN USUARIO
// // Se crea y exporta la Función para actualizar un usuario
// export const actualizarUsuario = async ({
//   id,
//   nombres,
//   apellidos,
//   documento,
//   email,
//   contrasena,
//   cargo,
//   picturePath,
// }) => {
//   const response = await clientsAPI.patch(`${userUrlEndPoint}/${id}`, {
//     id,
//     nombres,
//     apellidos,
//     documento,
//     email,
//     contrasena,
//     cargo,
//     picturePath,
//   })
//   return response.data
// }

export default clientsAPI
