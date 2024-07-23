'use client'

import Posting from '../../../..//components/form/Posting';
import SideBarLoader from '@/components/SideBarLoader';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react'


interface PostType {
  creator: {
    _id: string | undefined,
  },
  caption: string | undefined,
  tag: string | undefined,
  postPhoto: null | undefined,
}

function EditPost() {
  const { id } = useParams()
  const [loaded, setLoaded] = useState(true)
  const [userInfo, setUserInfo] = useState<PostType | null>()


  async function getUser() {
    const res = await fetch(`/api/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const Info = await res.json();
    setUserInfo(Info)
    setLoaded(false)
  }

  useEffect(() => {
    getUser()
  }, [id])

  const postUserData = {
    creatorId: userInfo?.creator?._id,
    caption: userInfo?.caption,
    tag: userInfo?.tag,
    postPhoto: userInfo?.postPhoto,
  }

  return loaded ? <SideBarLoader /> : (
    <Posting post={postUserData} apiEndpoint={`/api/post/${id}`} />
  )
}

export default EditPost