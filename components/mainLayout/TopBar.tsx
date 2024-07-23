"use client"

import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { creatorFC } from "../GeneralTypes";
import SideBarLoader from "../SideBarLoader";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Person } from "@mui/icons-material";

function TopBar() {
  const [userInfo, setUserInfo] = useState<creatorFC | null>()
  const [loaded, setLoaded] = useState(true)
  const { user, isLoaded } = useUser()
  const route = useRouter()

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
    <Box component={'nav'} sx={{ padding: '1rem', width: 'full', display: 'flex', flex: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
      <Box sx={{ display: 'flex', flex: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
        <UserButton afterSignOutUrl='/sign-in' appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }} />
        <Link href={`/profile/${userInfo?._id}/posts`}>
          <Person sx={{ fontSize: "35px", color: "#D9D9D9", }} />
        </Link>
      </Box>
      <Button sx={{
        backgroundColor: '#1D9BF0',
        borderColor: '#D9D9D9',
        color: '#020406',
        "&:hover": { borderColor: '#2F3336', borderWidth: '1px', color: '#D9D9D9' }
      }} onClick={() => { route.push('/create-post'); }} size="medium" variant="outlined"
      >
        Tweet
      </Button>
    </Box>
  )
}

export default TopBar