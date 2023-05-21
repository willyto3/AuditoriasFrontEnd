// ? IMPORTACIÓN DE MODULOS
// Importación de los componentes de Zustand
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Se crea y exporta la tienda con persistencia
export const auditoriaStore = create(
  persist(
    set => ({
      // ? TEMA DE LA PÁGINA
      mode: 'light',
      setMode: () =>
        set(state => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
        })),

      // ? TOKEN DEL USUARIO
      token: '',
      estaAutorizado: false,
      setToken: token => set(state => ({ token, estaAutorizado: true })),

      // ? DATOS DEL USUARIO
      usuario: '',
      setUsuario: usuario => set(state => ({ usuario })),
      logout: () =>
        set(state => ({
          token: '',
          estaAutorizado: false,
          usuario: '',
        })),

      // ? ID CLIENTE
      id: '',
      filter: {
        items: [{ field: '_id', operator: 'contains', value: '' }],
      },
      setId: id =>
        set(state => ({
          id,
          filter: {
            items: [{ field: '_id', operator: 'contains', value: `${id}` }],
          },
        })),
    }),

    { name: 'auditoria' }
  )
)
