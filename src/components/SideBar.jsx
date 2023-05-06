// ? IMPORTACIÓN DE MODULOS
import {
  AdminPanelSettingsOutlined,
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  Groups2Outlined,
  HomeOutlined,
  PieChartOutlined,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import { PropTypes } from 'prop-types'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// ? IMPORTACIÓN DE COMPONENTES
import FlexBetween from '../components/FlexBetween'
import { auditoriaStore } from '../store/auditoriaStore'

const navItems = [
  {
    text: 'Dashboard',
    icon: <HomeOutlined />,
  },
  {
    text: 'Auditores',
    icon: null,
  },
  {
    text: 'Listado',
    icon: <Groups2Outlined />,
  },
  {
    text: 'Registro',
    icon: <ReceiptLongOutlined />,
  },
  {
    text: 'Sales',
    icon: null,
  },
  {
    text: 'Overview',
    icon: <PointOfSaleOutlined />,
  },
  {
    text: 'Daily',
    icon: <TodayOutlined />,
  },
  {
    text: 'Monthly',
    icon: <CalendarMonthOutlined />,
  },
  {
    text: 'Breakdown',
    icon: <PieChartOutlined />,
  },
  {
    text: 'Management',
    icon: null,
  },
  {
    text: 'Admin',
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: 'Performance',
    icon: <TrendingUpOutlined />,
  },
]

const SideBar = ({
  drawerWidth,
  abiertaSideBar,
  setAbiertaSideBar,
  pantallaCompleta,
}) => {
  // se usa la tienda para conocer el valor del usuario
  const usuario = auditoriaStore(state => state.usuario)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()

  const [active, setActive] = useState('')
  useEffect(() => {
    setActive(pathname.substring(1))
  }, [pathname])

  return (
    <Box component='nav'>
      {abiertaSideBar && (
        <Drawer
          open={abiertaSideBar}
          onClose={() => setAbiertaSideBar(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: 'border-box',
              borderWidth: pantallaCompleta ? 0 : '2px',
              width: drawerWidth,
            },
          }}
        >
          <Box width='100%'>
            <Box m='1.5rem 2rem 2rem 3rem'>
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display='flex' alignItems='center' gap='0.5rem'>
                  <Typography variant='h4' fontWeight='bold'>
                    AUDITORIAS PAULA
                  </Typography>
                </Box>
                {pantallaCompleta && (
                  <IconButton
                    onClick={() => setAbiertaSideBar(!abiertaSideBar)}
                  >
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                      {text}
                    </Typography>
                  )
                }
                const lcText = text.toLowerCase()
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(
                          lcText === 'dashboard' ? '/dashboard' : `${lcText}`
                        )
                        setActive(lcText)
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : 'transparent',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '2rem',
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: 'auto' }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </Box>

          <Box position='absolute' bottom='2rem'>
            <Divider />
            <FlexBetween textTransform='none' gap='1rem' m='1.5rem 2rem 0 3rem'>
              <Box
                component='img'
                alt='profile'
                src={`http://localhost:5001/images/${usuario.picturePath}`}
                height='40px'
                width='40px'
                borderRadius='50%'
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign='left'>
                <Typography
                  fontWeight='bold'
                  fontSize='0.9rem'
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {usuario.nombres} {usuario.apellidos}
                </Typography>
                <Typography
                  fontWeight='bold'
                  fontSize='0.8rem'
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {usuario.cargo}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  )
}
export default SideBar

SideBar.propTypes = {
  abiertaSideBar: PropTypes.bool,
  setAbiertaSideBar: PropTypes.any,
  drawerWidth: PropTypes.string,
  pantallaCompleta: PropTypes.bool,
}
