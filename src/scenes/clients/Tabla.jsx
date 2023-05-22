// ? IMPORTACIÓN DE PAQUETES
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Box, useTheme, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

// ? IMPORTACION DE COMPONENTES
import { tokens } from '../../theme'
import columnas from './columnas'
import contactColumns from './ContactColumns'
import Header from '../../components/Header'
import { auditoriaStore } from '../../store/auditoriaStore'

// ? IMPORTACION DE HOOKS
import { useClients, useClient } from '../../hooks/useClients'

// ! COMIENZO DEL COMPONENTE
const Tabla = () => {
  // ? USO DE PAQUETES
  // se usa la tienda para conocer el valor del id
  const id = auditoriaStore(state => state.id)
  // se usa la tienda para conocer el valor del filtro
  const filter = auditoriaStore(state => state.filter)
  // Query para buscar todos los Usuarios
  const { data: clients, isLoading, isError, error } = useClients()
  // Query para buscar un usuario
  const { data: client, isLoading: isloadingClient } = useClient(id)
  // Uso del Tema
  const theme = useTheme()
  // Creamos constantes para los colores
  const colors = tokens(theme.palette.mode)

  const columns = columnas()
  const contactColumn = contactColumns()

  // ? FUNCIONES

  // Se verifica si se esta cargando la información
  if (isLoading || isloadingClient) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
        <Typography>Cargando...</Typography>
      </Box>
    )
  }

  // Se verifica si se presento un Error
  if (isError) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
        <Typography>{error.message}</Typography>
      </Box>
    )
  }

  return (
    <Box m='0 2rem'>
      <Box
        mt='10px'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
            fontSize: '20px',
          },
          '.name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontSize: '18px',
            textTransform: 'uppercase',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '&	.MuiDataGrid-footerCell': {
            fontSize: '18px',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={row => row._id}
          rows={clients || []}
          columns={columns}
          density='comfortable'
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
            sorting: {
              sortModel: [{ field: 'name', sort: 'asc' }],
            },
            columns: {
              columnVisibilityModel: {
                _id: false,
              },
            },
          }}
          filterModel={filter}
          pageSizeOptions={[5, 10, 15]}
          autoHeight={true}
        />
        {id !== '' && (
          <Box mt='20px'>
            <Header
              title={`${client?.name}`}
              subtitle={`Listado de Contactos`}
            />
            <DataGrid
              loading={isloadingClient}
              getRowId={row => row._id}
              rows={client?.contact || []}
              columns={contactColumn}
              autoHeight={true}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}
export default Tabla
