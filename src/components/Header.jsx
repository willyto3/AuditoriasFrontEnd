import { Box, Typography, useTheme } from '@mui/material'

import { PropTypes } from 'prop-types'

import { tokens } from '../theme'

const Header = ({ title, subtitle }) => {
  const theme = useTheme()
  // Creamos constantes para los colores
  const colors = tokens(theme.palette.mode)

  return (
    <Box ml='3rem'>
      <Typography
        variant='h4'
        color={colors.grey[100]}
        fontWeight='bold'
        textTransform='uppercase'
        sx={{ mb: '5px' }}
      >
        {title}
      </Typography>
      <Typography
        variant='h5'
        color={colors.greenAccent[400]}
        textTransform='capitalize'
        sx={{ mb: '5px' }}
      >
        {subtitle}
      </Typography>
    </Box>
  )
}
export default Header

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}
