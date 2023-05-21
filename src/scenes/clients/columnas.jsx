// ? IMPORTACIÓN DE PAQUETES
import { useMemo } from 'react'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Box, Avatar, useTheme } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

// ? IMPORTACIÓN DE COMPONENTES
import { auditoriaStore } from '../../store/auditoriaStore'
import Acciones from './Acciones'
import { tokens } from '../../theme'
import CreatedBy from './CreatedBy'

const columnas = () => {
  // se usa la tienda para conocer el valor del usuario
  const usuario = auditoriaStore(state => state.usuario)
  // Uso del Tema
  const theme = useTheme()
  // Creamos constantes para los colores
  const colors = tokens(theme.palette.mode)

  // Columnas de la tabla de Auditores

  const columns = useMemo(
    () => [
      { field: '_id', headerName: 'ID' },

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
      { field: 'NIT', headerName: 'NIT', flex: 0.5 },
      {
        field: 'name',
        headerName: 'Nombre de la Empresa',
        flex: 1,
        cellClassName: 'name-column--cell',
      },
      { field: 'email', headerName: 'Email', flex: 0.5 },
      {
        field: 'avatar',
        headerName: 'Creado por:',
        flex: 0.4,
        renderCell: params => <CreatedBy {...{ params }} />,
        sortable: false,
        filterable: false,
      },

      usuario.rol !== 'Usuario' && {
        field: 'isActive',
        headerName: 'Activo',
        width: 80,
        renderCell: ({ row: { isActive } }) => {
          return (
            <Box
              width='90%'
              m='0 auto'
              p='5px'
              display='flex'
              justifyContent='center'
            >
              {isActive && (
                <CheckCircleOutlineIcon
                  sx={{ color: colors.greenAccent[500] }}
                />
              )}
              {!isActive && (
                <CancelOutlinedIcon sx={{ color: colors.redAccent[400] }} />
              )}
            </Box>
          )
        },
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
  return columns
}
export default columnas
