// ? IMPORTACIÓN DE PAQUETES
import { useMemo } from 'react'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Box, Avatar, useTheme, Typography } from '@mui/material'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

// ? IMPORTACIÓN DE COMPONENTES
import { auditoriaStore } from '../../store/auditoriaStore'
import Acciones from './Acciones'
import { tokens } from '../../theme'

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
        cellClassName: 'name-column--cell',
      },
      { field: 'email', headerName: 'Email', flex: 0.5 },
      { field: 'cargo', headerName: 'Cargo', flex: 0.5 },

      usuario.rol !== 'Usuario' && {
        field: 'estaActivo',
        headerName: 'Activo',
        width: 80,
        renderCell: ({ row: { estaActivo } }) => {
          return (
            <Box
              width='90%'
              m='0 auto'
              p='5px'
              display='flex'
              justifyContent='center'
            >
              {estaActivo && (
                <CheckCircleOutlineIcon
                  sx={{ color: colors.greenAccent[500] }}
                />
              )}
              {!estaActivo && (
                <CancelOutlinedIcon sx={{ color: colors.redAccent[400] }} />
              )}
            </Box>
          )
        },
      },
      usuario.rol !== 'Usuario' && {
        field: 'rol',
        headerName: 'Rol',
        flex: 0.4,
        renderCell: ({ row: { rol } }) => {
          return (
            <Box
              width='80%'
              m='0 auto'
              p='5px'
              display='flex'
              justifyContent='space-between'
              borderRadius='4px'
              backgroundColor={
                rol === 'Admin'
                  ? colors.greenAccent[600]
                  : colors.greenAccent[800]
              }
            >
              {rol === 'Admin' && <AdminPanelSettingsOutlinedIcon />}
              {rol === 'Super Admin' && <SecurityOutlinedIcon />}
              {rol === 'Usuario' && <LockOpenOutlinedIcon />}
              <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                {rol}
              </Typography>
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
