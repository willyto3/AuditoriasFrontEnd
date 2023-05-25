// ? IMPORTACIÓN DE MODULOS
// Importación de los componentes de Zustand
import axios from 'axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Se crea y exporta la tienda con persistencia
export const auditoriaStore = create(
  immer(
    persist(
      set => ({
        // ? ESTADOS INICIALES
        mode: 'light',
        usuario: '',
        id: '',
        token: '',
        estaAutorizado: false,
        usuarios: [],

        filter: {
          items: [{ field: '_id', operator: 'contains', value: '' }],
        },
        columnVisibilityModel: {
          _id: false,
        },

        // ? TEMA DE LA PÁGINA
        setMode: () =>
          set(state => ({
            mode: state.mode === 'light' ? 'dark' : 'light',
          })),

        // ? TOKEN DEL USUARIO
        setToken: token => set(state => ({ token, estaAutorizado: true })),

        // ? DATOS DEL USUARIO
        setUsuario: usuario =>
          set(state => ({
            usuario,
          })),

        // ? LOGOUT DEL USUARIO
        logout: () =>
          set(state => ({
            token: '',
            estaAutorizado: false,
            usuario: '',
          })),

        // ? ID CLIENTE
        setId: id =>
          set(state => ({
            id,
            filter: {
              items: [{ field: '_id', operator: 'contains', value: `${id}` }],
            },
          })),

        // ? VISIBILIDAD COLUMNAS
        setColumnVisibilityModel: usuario =>
          set(state => ({
            columnVisibilityModel:
              state.usuario.rol === 'Usuario'
                ? {
                    _id: false,
                    isActive: false,
                    estaActivo: false,
                    rol: false,
                  }
                : {
                    _id: false,
                  },
          })),
      }),

      { name: 'auditoria' }
    )
  )
)
