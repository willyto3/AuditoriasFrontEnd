// ? IMPORTACIÓN DE PAQUETES
import { useMemo } from 'react'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Box, Avatar, useTheme } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

// ? IMPORTACIÓN DE COMPONENTES
import Acciones from './Acciones'
import { tokens } from '../../theme'
import CreatedBy from './CreatedBy'

const columnas = () => {
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
      { field: 'NIT', headerName: 'NIT', flex: 0.4 },
      {
        field: 'name',
        headerName: 'Nombre de la Empresa',
        flex: 0.9,
        cellClassName: 'name-column--cell',
      },
      { field: 'email', headerName: 'Email', flex: 0.5 },
      {
        field: 'avatar',
        headerName: 'Creado por:',
        flex: 0.7,
        renderCell: params => <CreatedBy {...{ params }} />,
        sortable: false,
        filterable: false,
      },
      {
        field: 'isActive',
        headerName: 'Activo',
        flex: 0.3,
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
                  sx={{ color: colors.greenAccent[500], fontSize: '1.5rem' }}
                />
              )}
              {!isActive && (
                <CancelOutlinedIcon
                  sx={{ color: colors.redAccent[400], fontSize: '1.5rem' }}
                />
              )}
            </Box>
          )
        },
      },
      {
        field: 'actions',
        headerName: 'Acciones',
        type: 'actions',
        flex: 0.4,
        renderCell: params => <Acciones {...{ params }} />,
      },
    ],
    []
  )
  return columns
}
export default columnas
