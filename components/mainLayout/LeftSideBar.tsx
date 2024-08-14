'use client'

import { SignedIn, SignOutButton, useUser } from '@clerk/nextjs'
import { Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { sidebarLinks } from '../../constants/index'
import Link from 'next/link';
import logoSVG from '../../public/icons8-twitter-1.svg'
import Image from 'next/image';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { creatorFC } from '../GeneralTypes';
import { useEffect, useState } from 'react';
import SideBarLoader from '../SideBarLoader';
import { usePathname } from 'next/navigation';

function LeftSideBar() {
  const [userInfo, setUserInfo] = useState<creatorFC | null>()
  const [loaded, setLoaded] = useState(true)
  const { user, isLoaded } = useUser()
  const pathName = usePathname()

  async function getUser() {
    const res = await fetch(`/api/user/${user?.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const Info = await res.json();
    setUserInfo(Info)
    setLoaded(false)
  }

  useEffect(() => {
    if(user){
      getUser()
    }
  }, [user])

  return loaded || !isLoaded ? <SideBarLoader /> : (
    <>
      {userInfo && user &&
        <Box component={'aside'}
          sx={{
            overflow: 'hidden',
            width: '22.75rem',
            height: '100vh',
            borderWidth: '1px',
            borderColor: '#2F3336',
            padding: '1rem',
            display: {md:'block',xs:'none'},
          }}
        >
          <Link href={'/'}>
            <Box sx={{ padding: '.5rem', display: 'flex', flex: 'row', alignItems: 'center', justifyContent: 'center', gap: '1rem', }}>
              <Image src={logoSVG} alt='logo' height={500} width={500} className='w-auto h-6' />
              <Typography>Twitter</Typography>
            </Box>
          </Link>
          <Box sx={{ paddingBottom: '2rem' }}>
            <Box sx={{ paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {userInfo &&
                <Link href={`/profile/${userInfo?._id}/posts `} className={`${`${`/profile/${userInfo?._id}/posts`}` === pathName ? "text-white" : ""}`} >
                  <Image src={userInfo?.profilePhoto} alt='logo' height={500} width={500} className='w-auto h-14 rounded-full' />
                </Link>}
            </Box>
            <Stack spacing={1} direction='column'>
              <Stack direction='column' sx={{ justifyContent: 'center', textAlign: 'center', }}>
                <Link href={`/profile/${userInfo?._id}/posts`} className={`${`${`/profile/${userInfo?._id}/posts`}` === pathName ? "text-white" : ""}`}>
                  <Typography>{userInfo?.firstName} {userInfo?.lastName}</Typography>
                </Link>
                <Typography
                  sx={{
                    color:'#6E767D',
                    fontSize:'12px',
                    fontWeight: '200',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '82%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {userInfo?.email}
                </Typography>
              </Stack>
              <Stack spacing={'auto'} direction='row' sx={{ textAlign: 'center', fontSize: '12px' }} >
                <Link
                  className={`${`${`/profile/${userInfo?._id}/posts`}` === pathName ? "text-white" : ""}`}
                  href={`/profile/${userInfo?._id}/posts`}>
                  <Typography sx={{ fontSize: '12px', }}>Posts<br />{userInfo?.posts?.length}</Typography>
                </Link>
                <Link
                  className={`${`${`/profile/${userInfo?._id}/followers`}` === pathName ? "text-white" : ""}`}
                  href={`/profile/${userInfo?._id}/followers`}>
                  <Typography sx={{ fontSize: '12px', }}>Followers<br />{userInfo?.followers?.length}</Typography>
                </Link>
                <Link
                  className={`${`${`/profile/${userInfo?._id}/following`}` === pathName ? "text-white" : ""}`}
                  href={`/profile/${userInfo?._id}/following`}>
                  <Typography sx={{ fontSize: '12px', }}>Following<br />{userInfo?.following?.length}</Typography>
                </Link>
              </Stack>
            </Stack>
          </Box>
          <Stack spacing={2}>
            {sidebarLinks.map((link) =>
              <Link key={link.label} href={link.route}>
                <Box
                  className={`${link.route === pathName ? "text-white font-medium" : ""}`}
                  sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyItems: 'center' }}>
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
                  <Typography>Sign Out</Typography>
                </Box>
              </SignOutButton>
            </SignedIn>
          </Box>
        </Box>}
    </>

  )
}

export default LeftSideBar