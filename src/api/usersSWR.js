// Importación de useSWR de SWR
import useSWR from 'swr'
// Importamos las funciones de GetUser y el enlace de usuario
import {
  userUrlEndPoint as cacheKey,
  eliminarUsuario,
  obtenerTodosLosUsuarios,
  registroUsuario,
} from '../api/users'

export const useFetch = () => {
  ObtenerTodosLosUsuarios: () =>
    useSWR(cacheKey, async () => {
      const response = await obtenerTodosLosUsuarios()
      console.log('SWR Respuesta', response)
      return response
    })
}
// const fetcher = (...args) => fetch(...args).then(response => response.json())

// export function useUsers() {
//   // Hacemos uso del UseSWR
//   const { data, isLoading, error, mutate } = useSWR(cacheKey, obtenerTodosLosUsuarios)

//   return {
//     usuarios: data,
//     isLoading,
//     isError: error,
//     mutate,
//   }
// }
