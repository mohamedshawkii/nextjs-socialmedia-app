import { Box } from '@mui/material'
import React from 'react'

function rightSideBar() {
  return (
    <Box component={'aside'}
      sx={{
        width: '18.75rem',
        height: '100vh',
        borderWidth: '1px',
        borderColor: '#2F3336',
        padding: '1rem'
      }}
    >
    </Box>
  )
}

export default rightSideBar