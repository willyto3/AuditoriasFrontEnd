// ? IMPORTACIÓN DE PAQUETES
// Importación del modulo Axios
import axios from 'axios'

// Se coloca la URL como una constante
const BASE_URL = 'http://localhost:5001/api/v1'

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
  const response = await clientsAPI.get(userUrlEndPoint)
  return response.data
}

// ? OBTENER UN CLIENTE
// Se crea y exporta la Función para obtener un Cliente
export const getAClient = async id => {
  const response = await clientsAPI.get(`${userUrlEndPoint}/${id}`)
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