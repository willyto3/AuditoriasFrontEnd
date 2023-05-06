// ? IMPORTACIÓN DE MODULOS
// Importación de los componentes de Zustand
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Se crea y exporta la tienda con persistencia
export const auditoriaStore = create(
  persist(
    set => ({
      // Tema de la pagina
      eleccionTema: 'claro',
      setEleccionTema: () =>
        set(state => ({
          eleccionTema: state.eleccionTema === 'claro' ? 'oscuro' : 'claro',
        })),
      // Token del Usuario
      token: '',
      estaAutorizado: false,
      setToken: token => set(state => ({ token, estaAutorizado: true })),
      // Datos del Usuario
      usuario: '',
      setUsuario: usuario => set(state => ({ usuario })),
      logout: () =>
        set(state => ({
          token: '',
          estaAutorizado: false,
          usuario: '',
        })),
    }),

    { name: 'auditoria' }
  )
)
