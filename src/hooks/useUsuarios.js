// ? IMPORTACIÓN DE PAQUETES
import { useQuery, useMutation, useQueryClient } from 'react-query'

// Importamos las funciones de API
import {
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  registroUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../api/users'

const key = 'busquedaUsuarios'

export const useUsuarios = () => {
  return useQuery(key, obtenerTodosLosUsuarios)
}

export const useUsuario = id => {
  return useQuery(['busquedaUsuario', id], () => obtenerUnUsuario(id))
}

export const useRegistroUsuario = () => {
  const queryClient = useQueryClient()
  return useMutation('registroUsuario', registroUsuario, {
    onSuccess: usuario => {
      queryClient.setQueryData([
        key,
        prevUsuarios => prevUsuarios.concat(usuario),
      ])
      queryClient.invalidateQueries([key])
    },
  })
}

export const useActualizarUsuario = () => {
  const queryClient = useQueryClient()
  return useMutation('actualizarUsuario', actualizarUsuario, {
    onSuccess: usuario => {
      queryClient.setQueryData([
        key,
        prevUsuarios => prevUsuarios.concat(usuario),
      ])
      queryClient.invalidateQueries([key])
    },
  })
}

export const useEliminarUsuario = id => {
  const queryClient = useQueryClient()
  return useMutation('eliminarUsuario', eliminarUsuario, {
    onSuccess: usuario => {
      queryClient.setQueryData([
        key,
        prevUsuarios => prevUsuarios.concat(usuario),
      ])
      queryClient.invalidateQueries([key])
    },
  })
}
