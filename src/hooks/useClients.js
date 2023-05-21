// ? IMPORTACIÓN DE PAQUETES
import { useQuery, useMutation, useQueryClient } from 'react-query'

// Importamos las funciones de API
import { getAllClients, getAClient } from '../api/clients'

const key = 'getAllClients'

export const useClients = () => {
  return useQuery(key, getAllClients)
}

export const useClient = id => {
  return useQuery(['getAClient', id], () => getAClient(id))
}

// export const useRegistroUsuario = () => {
//   const queryClient = useQueryClient()
//   return useMutation('registroUsuario', registroUsuario, {
//     onSuccess: usuario => {
//       queryClient.setQueryData([
//         key,
//         prevUsuarios => prevUsuarios.concat(usuario),
//       ])
//       queryClient.invalidateQueries([key])
//     },
//   })
// }

// export const useActualizarUsuario = () => {
//   const queryClient = useQueryClient()
//   return useMutation('actualizarUsuario', actualizarUsuario, {
//     onSuccess: usuario => {
//       queryClient.setQueryData([
//         key,
//         prevUsuarios => prevUsuarios.concat(usuario),
//       ])
//       queryClient.invalidateQueries([key])
//     },
//   })
// }

// export const useEliminarUsuario = id => {
//   const queryClient = useQueryClient()
//   return useMutation('eliminarUsuario', eliminarUsuario, {
//     onSuccess: usuario => {
//       queryClient.setQueryData([
//         key,
//         prevUsuarios => prevUsuarios.concat(usuario),
//       ])
//       queryClient.invalidateQueries([key])
//     },
//   })
// }
