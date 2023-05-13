// ? IMPORTACIÓN DE COMPONENTES
import { useQuery, useMutation } from 'react-query'

// Importamos las funciones de API
import { obtenerTodosLosUsuarios, registroUsuario } from '../api/users'

export const useUsuarios = () => {
  return useQuery('busquedausuarios', obtenerTodosLosUsuarios)
}

export const useRegistroUsuario = () => {
  return useMutation('registroUsuario', registroUsuario)
}
