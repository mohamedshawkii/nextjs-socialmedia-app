'use client'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { creatorFC } from '../GeneralTypes';
import SideBarLoader from '../SideBarLoader';
import UserCard from '../cards/UserCard';

function rightSideBar() {
  const [loaded, setLoaded] = useState(true)
  const [allUsers, setUserInfo] = useState<creatorFC | null>()

  async function getUser() {
    const res = await fetch(`/api/user`);
    const Info = await res.json();
    setUserInfo(Info)
    setLoaded(false)
  }

  useEffect(() => {
    getUser()
  }, [])

  return loaded ? <SideBarLoader /> : (
    <>
      {allUsers &&

        <Box
          component={'aside'}
          sx={{
            overflow: 'hidden',
            width: '22.75rem',
            height: '100vh',
          }}
        >
          <Box sx={{ height: '4rem', borderWidth: '1px', borderColor: '#2F3336', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography>Other People</Typography>
          </Box>

          <Box sx={{ padding: '1rem', borderWidth: '1px', borderColor: '#2F3336', height: '100%', }} >
            <Box className={'grid grid-cols-1 gap-3 justify-center'}>
              {allUsers && allUsers?.map((user: creatorFC) => (
                <UserCard key={user._id} userInfo={user} update={getUser as () => Promise<void>} />
              ))}
            </Box>
          </Box>
        </Box>}
    </>
  )
}

export default rightSideBar