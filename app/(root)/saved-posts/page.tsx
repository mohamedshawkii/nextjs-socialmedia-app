"use client";

import { useUser } from '@clerk/nextjs'
import PostCard from '@/components/cards/PostCard';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { creatorFC } from '@/components/GeneralTypes';
import { creatorAndPostFC } from '@/components/GeneralTypes';
import SideBarLoader from '@/components/SideBarLoader';

interface loggedInUserType {
  id: string;
}

const SavedPosts = () => {
  const { user, isLoaded } = useUser()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<creatorAndPostFC | null>()

  const getUser = async () => {
    const response = await fetch(`/api/user/${user?.id}`)
    const data = await response.json()
    setUserData(data.savedPosts)
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  return loading || !isLoaded ? <SideBarLoader /> : (
    <div className='flex flex-col gap-9'>
      {userData?.map((post: creatorAndPostFC) => (
        <PostCard key={post._id} post={post} creator={post.creator as creatorFC} loggedInUser={user as loggedInUserType} update={getUser} />
      ))}
    </div>
  )
}

export default SavedPosts