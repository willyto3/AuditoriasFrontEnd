// ? IMPORTACIÓN DE PAQUETES
import { DataGrid } from '@mui/x-data-grid'
import { useMemo } from 'react'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Box, Avatar, useTheme, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

// ? IMPORTACION DE COMPONENTES
import Header from '../../components/Header'
import Acciones from './Acciones'
import { auditoriaStore } from '../../store/auditoriaStore'

// ? IMPORTACION DE HOOKS
import { useUsuarios } from '../../hooks/useUsuarios'

const Tabla = () => {
  // ? USO DE PAQUETES
  // Query para buscar todos los Usuarios
  const { data: usuarios, isLoading, isError, error } = useUsuarios()
  // Uso del Tema
  const tema = useTheme()
  // se usa la tienda para conocer el valor del usuario
  const usuario = auditoriaStore(state => state.usuario)

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
      { field: 'rol', headerName: 'Rol', flex: 1 },

      {
        field: 'estaActivo',
        type: 'boolean',
        headerName: 'Activo',
        width: 100,
      },
      {
        field: 'actions',
        headerName: 'Acciones',
        type: 'actions',
        width: 100,
        renderCell: params => <Acciones {...{ params }} />,
      },
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
          rows={usuarios || []}
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
