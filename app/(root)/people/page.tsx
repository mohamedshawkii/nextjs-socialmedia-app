'use client'

import React, { useEffect, useState } from 'react'
import { creatorFC } from '@/components/GeneralTypes'
import SideBarLoader from '@/components/SideBarLoader'
import UserCard from '@/components/cards/UserCard'
import { Box, Grid } from '@mui/material';


function People() {

  const [loaded, setLoaded] = useState(true)
  const [allUsers, setUserInfo] = useState<creatorFC | null>()

  async function getUser() {
    const res = await fetch(`api/user`);
    const Info = await res.json();
    setUserInfo(Info)
    setLoaded(false)
  }

  useEffect(() => {
    getUser()
  }, [])

  return loaded ? <SideBarLoader /> : (
    <Box className={'grid grid-cols-3 gap-2 justify-start items-start'} sx={{ padding: '1.25rem' }}>
      {allUsers && allUsers?.map((user: creatorFC) => (
        <UserCard key={user._id} userInfo={user} update={getUser as () => Promise<void>} />
      ))}
    </Box>

  )
}

export default People