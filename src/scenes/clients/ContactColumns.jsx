// ? IMPORTACIÓN DE PAQUETES
import { useMemo } from 'react'

// ? IMPORTACIÓN DE ELEMENTOS DE DISEÑO
import { Avatar } from '@mui/material'

// ? IMPORTACIÓN DE COMPONENTES
import ContactActions from './AccionesContact'

const contactColumns = () => {

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
      {
        field: 'fullName',
        headerName: 'Nombre Completo',
        flex: 1,
        valueGetter: params =>
          `${params.row.firtsName || ''} ${params.row.lastName || ''}`,
        cellClassName: 'name-column--cell',
      },
      { field: 'contactEmail', headerName: 'Email', flex: 0.5 },
      {
        field: 'phoneNumber',
        headerName: 'Telefono',
        flex: 1,
      },

      {
        field: 'actions',
        headerName: 'Acciones',
        type: 'actions',
        flex: 0.5,
        renderCell: params => <ContactActions {...{ params }} />,
      },
    ],
    []
  )
  return columns
}
export default contactColumns
