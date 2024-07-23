'use client'

import React, { useEffect, useState } from 'react'
import { creatorFC } from '@/components/GeneralTypes'
import SideBarLoader from '@/components/SideBarLoader'
import Grid from '@mui/material/Unstable_Grid2';
import UserCard from '@/components/cards/UserCard'


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
    <Grid container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      columns={1}
      rowSpacing={1} columnSpacing={1}
    >
      <Grid xs={1}>
        {allUsers?.map((user: creatorFC) => (
          <UserCard key={user._id} userInfo={user} update={getUser as () => Promise<void>} />
        ))}
      </Grid>
    </Grid>
  )
}

export default People