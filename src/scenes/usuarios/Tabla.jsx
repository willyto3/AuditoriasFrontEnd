import { Box, Avatar, useTheme, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import Header from '../../components/Header'

// ? IMPORTACIÓN DE COMPONENTES
import { useFetch } from '../../api/usersSWR'

// Importamos las funciones de registroUsuario
import { useMemo } from 'react'

const Tabla = () => {
  const { ObtenerTodosLosUsuarios } = useFetch()
  const { data: usuarios } = ObtenerTodosLosUsuarios()
  console.log(usuarios)
  // Uso del Tema
  const tema = useTheme()

  // Comprobamos si se presento un error al ejecutar la función
  if (isError) {
    return <h2>Se Presento un Error</h2>
  }

  // ? FUNCIONES

  const eliminar = async _id => {
    console.log(_id)
    // try {
    //   await mutate(eliminarUsuario(_id))
    // } catch (error) {
    //   console.log(error)
    // }
  }

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
      {
        field: 'actions',
        headerName: 'Acciones',
        type: 'actions',
        width: 150,
        renderCell: params => (
          <IconButton onClick={() => eliminar(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    []
  )

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
          loading={isLoading || !usuarios}
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
