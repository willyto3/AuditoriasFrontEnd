// ? IMPORTACIÓN DE COMPONENTES
import { useQuery } from 'react-query'
import { Box, Avatar, useTheme, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid'
import Header from '../../components/Header'
// Importamos las funciones de registroUsuario
import { useMemo } from 'react'

import { obtenerTodosLosUsuarios } from '../../api/users'

// import { obtenerTodosLosUsuarios } from '../../api/users'
const Tabla = () => {
  // Query para buscar todos los Usuarios
  const { isLoading, data } = useQuery(
    'busquedausuarios',
    obtenerTodosLosUsuarios
  )
  // Uso del Tema
  const tema = useTheme()

  // Columnas de la tabla de Auditores
  const columns = useMemo(
    () => [
      {
        field: 'picturePath',
        headerName: 'Avatar',
        width: '100',
        renderCell: params => (
          <Avatar
            src={`http://localhost:5001/images/${params.row.picturePath}`}
          />
        ),
        sortable: false,
        filterable: false,
      },
      { field: 'documento', headerName: 'Documento', flex: 0.5 },
      {
        field: 'fullName',
        headerName: 'Nombre Completo',
        flex: 1,
        valueGetter: params =>
          `${params.row.nombres || ''} ${params.row.apellidos || ''}`,
      },
      { field: 'email', headerName: 'Email', flex: 1 },
      { field: 'cargo', headerName: 'Cargo', flex: 1 },
    ],
    []
  )

  // ? FUNCIONES

  // Se verifica si se esta cargando la información
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
      <Typography>Cargando...</Typography>
    </Box>
    )
  }

  return (
    <Box m='1.5rem 2.5rem'>
      <Header subtitle='Listado de Auditores' />
      <Box
        mt='40px'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: 'none',
            backgroundColor: tema.palette.background.alt,
            color: tema.palette.secondary[100],
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: tema.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: tema.palette.background.alt,
            color: tema.palette.secondary[100],
          },
          '& .MuiDataGrid-toolbarContainer .MuiDataGrid-text': {
            color: `${tema.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={row => row._id}
          rows={data || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 15, 20]}
          autoHeight={true}
        />
      </Box>
    </Box>
  )
}
export default Tabla
