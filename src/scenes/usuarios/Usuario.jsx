import { useParams } from 'react-router-dom'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Box, Typography, useTheme } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

// ? IMPORTACIÓN DE COMPONENTES
import { tokens } from '../../theme'

// ? IMPORTACION DE HOOKS
import { useUsuario } from '../../hooks/useUsuarios'

const Usuario = () => {
  // ? USO DE PAQUETES
  const { id } = useParams()
  // Query para buscar todos los Usuarios
  const { data, isLoading, isError, error } = useUsuario(id)
  // Uso del Tema
  const theme = useTheme()
  // Creamos constantes para los colores
  const colors = tokens(theme.palette.mode)

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
    <Box
      display='flex'
      alignContent='center'
      alignItems='center'
      p='10px 10px'
      m='auto'
      sx={{ flexDirection: 'column', width: '800px', borderRadius: '8px' }}
    >
      <Box
        width='250px'
        height='250px'
        display='flex'
        alignContent='center'
        alignItems='center'
        sx={{
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <img
          src={`http://localhost:5001/images/${data.picturePath}`}
          alt='Foto de Perfil'
          height='100%'
          width='100%'
        />
      </Box>
      <Typography variant='h2' mt='10px'>
        {data.nombres} {data.apellidos}
      </Typography>
      <Typography variant='h3'>{data.cargo}</Typography>
      <Typography variant='h4'>{data.email}</Typography>
      <Typography variant='h4'>{data.documento}</Typography>
      <Box
        width='25%'
        m='10px auto'
        p='5px'
        display='flex'
        justifyContent='space-between'
        borderRadius='4px'
        backgroundColor={
          data.rol === 'Admin'
            ? colors.greenAccent[600]
            : colors.greenAccent[800]
        }
      >
        {data.rol === 'Admin' && (
          <AdminPanelSettingsOutlinedIcon sx={{ fontSize: '1.5rem' }} />
        )}
        {data.rol === 'Super Admin' && (
          <SecurityOutlinedIcon sx={{ fontSize: '1.5rem' }} />
        )}
        {data.rol === 'Usuario' && (
          <LockOpenOutlinedIcon sx={{ fontSize: '1.5rem' }} />
        )}
        <Typography color={colors.grey[100]} sx={{ ml: '5px' }} variant='h4'>
          {data.rol}
        </Typography>
      </Box>

      <Box
        width='25%'
        m='10px auto'
        p='5px'
        display='flex'
        justifyContent='space-between'
        borderRadius='4px'
        backgroundColor={
          data.estaActivo ? colors.greenAccent[600] : colors.redAccent[600]
        }
      >
        {data.estaActivo && (
          <CheckCircleOutlineIcon
            sx={{ color: colors.grey[100], fontSize: '1.5rem' }}
          />
        )}
        {!data.estaActivo && (
          <CancelOutlinedIcon
          sx={{ color: colors.grey[100], fontSize: '1.5rem' }}
        />
        )}

        <Typography color={colors.grey[100]} sx={{ ml: '5px' }} variant='h4'>
          {data.estaActivo ? 'Activo' : 'Desactivado'}
        </Typography>
      </Box>

    </Box>
  )
}
export default Usuario
