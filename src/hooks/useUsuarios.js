// ? IMPORTACIÓN DE COMPONENTES
import { useQuery, useMutation } from 'react-query'

// Importamos las funciones de API
import {
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  registroUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../api/users'

export const useUsuarios = () => {
  return useQuery('busquedaUsuarios', obtenerTodosLosUsuarios)
}

export const useUsuario = id => {
  return useQuery(['busquedaUsuario', id], () => obtenerUnUsuario(id))
}

export const useRegistroUsuario = () => {
  return useMutation('registroUsuario', registroUsuario)
}

export const useActualizarUsuario = () => {
  return useMutation('actualizarUsuario', actualizarUsuario)
}

export const useEliminarUsuario = id => {
  return useMutation('eliminarUsuario', eliminarUsuario)
}
