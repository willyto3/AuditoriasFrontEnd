// Importación de useSWR de SWR
import useSWR from 'swr'
// Importamos las funciones de GetUser y el enlace de usuario
import {
  userUrlEndPoint as cacheKey,
  eliminarUsuario,
  obtenerTodosLosUsuarios,
  registroUsuario,
} from '../api/users'

export function useUsers() {
  // Hacemos uso del UseSWR
  const { data, isLoading, error } = useSWR(cacheKey, obtenerTodosLosUsuarios, {
    suspense: true,
  })

  return {
    usuarios: data,
    isLoading,
    isError: error,
  }
}

export function useCreate() {
  // Hacemos uso del UseSWR
  const { mutate } = useSWR(cacheKey, registroUsuario, { suspense: true })

  return {
    mutate,
  }
}

export function useDelete() {
  // Hacemos uso del UseSWR
  const { mutate } = useSWR(cacheKey, eliminarUsuario, { suspense: true })

  return {
    mutate,
  }
}
