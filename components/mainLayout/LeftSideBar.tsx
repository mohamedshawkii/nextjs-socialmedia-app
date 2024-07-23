'use client'

import { SignedIn, SignOutButton, useUser } from '@clerk/nextjs'
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { sidebarLinks } from '../../constants/index'
import Link from 'next/link';
import logoSVG from '../../public/icons8-twitter-1.svg'
import Image from 'next/image';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { creatorFC } from '../GeneralTypes';
import { useEffect, useState } from 'react';
import SideBarLoader from '../SideBarLoader';

function LeftSideBar() {
  const [userInfo, setUserInfo] = useState<creatorFC | null>()
  const [loaded, setLoaded] = useState(true)
  const { user, isLoaded } = useUser()

  async function getUser() {
    const res = await fetch(`api/user/${user?.id}`);
    const Info = await res.json();
    setUserInfo(Info)
    setLoaded(false)
  }

  useEffect(() => {
    getUser()
  }, [user?.id])


  return loaded || !isLoaded ? <SideBarLoader /> : (
    <Box component={'aside'}
      sx={{
        overflow: 'hidden',
        maxWidth: '18.75rem',
        height: '100vh',
        borderWidth: '1px',
        borderColor: '#2F3336',
        padding: '1rem'
      }}
    >
      <Link href={'/'}>
        <Box sx={{ padding: '.5rem', display: 'flex', flex: 'row', alignItems: 'center', justifyContent: 'center', gap: '1rem', }}>
          <Image src={logoSVG} alt='logo' height={500} width={500} className='w-auto h-6' />
          <p>Twitter</p>
        </Box>
      </Link>

      <Box sx={{ paddingBottom: '2rem' }}>
        <Link href={`/profile/${userInfo?._id}/posts`}>
          <Box sx={{ paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {userInfo && <Image src={userInfo?.profilePhoto} alt='logo' height={500} width={500} className='w-auto h-14 rounded-full' />}
          </Box>
          <Stack spacing={1} direction='column'>
            <Stack direction='column' sx={{ justifyContent: 'start', textAlign: 'center', }}>
              <p>{userInfo?.firstName} {userInfo?.lastName}</p>
              <p className='mx-auto w-3/4 overflow-hidden whitespace-nowrap text-ellipsis'>{userInfo?.email}</p>
            </Stack>
            <Stack spacing={'auto'} direction='row' sx={{ textAlign: 'center', fontSize: '12px' }} >
              <p>Posts<br />{userInfo?.posts?.length}</p>
              <p>Followers<br />{userInfo?.followers?.length}</p>
              <p>Following<br />{userInfo?.following?.length}</p>
            </Stack>
          </Stack>
        </Link>
      </Box>

      <Stack spacing={2}>
        {sidebarLinks.map((link) =>
          <Link key={link.label} href={link.route}>
            <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyItems: 'center' }}>
              {link.icon}
              {link.label}
            </Box>
          </Link>
        )}
      </Stack>
      <Box sx={{ marginTop: 'auto' }}>
        <SignedIn>
          <SignOutButton redirectUrl='/sign-in'>
            <Box sx={{ cursor: 'pointer', display: 'flex', gap: '1rem', alignItems: 'center', justifyItems: 'center', marginTop: '4rem' }}>
              <ExitToAppIcon />
              <p>Sign Out</p>
            </Box>
          </SignOutButton>
        </SignedIn>
      </Box>
    </Box>
  )
}

export default LeftSideBar