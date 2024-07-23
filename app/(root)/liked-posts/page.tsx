"use client";
import PostCard from "@/components/cards/PostCard";
import { creatorAndPostFC, creatorFC } from "@/components/GeneralTypes"
import SideBarLoader from "@/components/SideBarLoader";
import { useUser } from "@clerk/nextjs";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

interface loggedInUserFC {
  id: string,
}

function LikedPosts() {
  const { user, isLoaded } = useUser();
  const [loaded, setLoaded] = useState(true)
  const [userInfo, setUserInfo] = useState<creatorAndPostFC | null>()

  async function getUser() {
    const res = await fetch(`api/user/${user?.id}`);
    const Info = await res.json();
    setUserInfo(Info.likedPosts)
    setLoaded(false)
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  return loaded || !isLoaded ? <SideBarLoader /> : (
    <Box>
      {userInfo?.map((post: creatorAndPostFC) => (
        <PostCard
          key={post._id}
          post={post}
          creator={post.creator as creatorFC}
          loggedInUser={user as loggedInUserFC}
          update={getUser} />
      ))}
    </Box>
  )
}

export default LikedPosts