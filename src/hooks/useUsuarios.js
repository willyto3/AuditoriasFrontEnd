// ? IMPORTACIÓN DE COMPONENTES
import { useQuery } from 'react-query'

// Importamos las funciones de API
import { obtenerTodosLosUsuarios } from '../api/users'

export const useUsuarios = () => {
  return useQuery('busquedausuarios', obtenerTodosLosUsuarios)
}
