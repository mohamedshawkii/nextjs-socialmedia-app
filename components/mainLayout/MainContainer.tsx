import React from 'react'
import TopBar from './TopBar'
import { Box } from '@mui/material'

function mainContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box className='w-full h-48'>
      <TopBar />
      <Box sx={{overflow:'scroll',height: '100vh',}}>
        {children}
      </Box>
    </Box>
  )
}

export default mainContainer