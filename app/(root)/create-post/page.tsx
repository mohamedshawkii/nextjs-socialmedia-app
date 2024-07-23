'use client'
import Posting from '@/components/form/Posting';
import { creatorFC } from '@/components/GeneralTypes';
import SideBarLoader from '@/components/SideBarLoader';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'

function CreatPost() {
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
    if(user){
      getUser()
    }
  }, [user])

  const postUserData = {
    creatorId: userInfo?._id,
    caption: "",
    tag: "",
    postPhoto: null,
  }

  return loaded || !isLoaded ? <SideBarLoader /> : (
    <Posting post={postUserData} apiEndpoint={"/api/post/new"} />
  )
}

export default CreatPost