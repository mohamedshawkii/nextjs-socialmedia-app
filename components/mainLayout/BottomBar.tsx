'use client'

import { SignedIn, SignOutButton, } from '@clerk/nextjs'
import { Box, Typography, } from '@mui/material';
import Stack from '@mui/material/Stack';
import { sidebarLinks } from '../../constants/index'
import Link from 'next/link';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { usePathname } from 'next/navigation';

function BottomBar() {
  const pathName = usePathname()
  return (
    <Box
      component={'nav'}
      sx={{
        width: 'full',
        borderWidth: '1px',
        borderColor: '#2F3336',
        padding: '1rem',
        display: { md: 'none', xs: 'block' },
        backgroundColor: '#020406',
        position: 'sticky',
        bottom: '0',
      }}
    >
      <Stack
        sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'space-between' }}
      >
        {sidebarLinks.map((link) =>
          <Link key={link.label} href={link.route}>
            <Box
              className={`${link.route === pathName ? "text-white font-medium" : ""}`}
              sx={{ display: 'flex', flexDirection: 'row', gap: '0.7rem', alignItems: 'center', }}>
              {link.icon}
              <Typography sx={{ display: { xs: 'none', sm: 'block', }, }}>  {link.label}
              </Typography>
            </Box>
          </Link>
        )}
        <SignedIn>
          <SignOutButton redirectUrl='/sign-in'>
            <Box sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', gap: '0.7rem', alignItems: 'center', }}>
              <ExitToAppIcon />
              <Typography sx={{ display: { xs: 'none', sm: 'block', }, }}>Exit</Typography>
            </Box>
          </SignOutButton>
        </SignedIn>
      </Stack>
    </Box>
  )
}

export default BottomBar