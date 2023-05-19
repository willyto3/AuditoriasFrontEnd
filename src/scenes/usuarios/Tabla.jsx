// ? IMPORTACIÓN DE PAQUETES
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Box, useTheme, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

// ? IMPORTACION DE COMPONENTES
import { tokens } from '../../theme'
import columnas from './columnas'

// ? IMPORTACION DE HOOKS
import { useUsuarios } from '../../hooks/useUsuarios'

// ! COMIENZO DEL COMPONENTE
const Tabla = () => {
  // ? USO DE PAQUETES
  // Query para buscar todos los Usuarios
  const { data: usuarios, isLoading, isError, error } = useUsuarios()
  // Uso del Tema
  const theme = useTheme()
  // Creamos constantes para los colores
  const colors = tokens(theme.palette.mode)

  const columns = columnas()

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
    <Box m='0 2rem'>
      <Box
        mt='40px'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
            fontSize: '18px',
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
          rows={usuarios || []}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
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
