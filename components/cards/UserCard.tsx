'use client'

import { useEffect, useState } from "react";
import { creatorFC } from "../GeneralTypes";
import { useUser } from "@clerk/nextjs";
import SideBarLoader from "../SideBarLoader";
import { Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function UserCard({ userInfo, update }: { userInfo: creatorFC, update: () => Promise<void> }) {
  const { user, isLoaded } = useUser();
  const [loaded, setLoaded] = useState(true)
  const [UserInfo, setUserInfo] = useState<creatorFC | null>()

  async function getUser() {
    const res = await fetch(`/api/user/${user?.id}`, {
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
    if (user) {
      getUser()
    }
  }, [user])

  const isFollowing = UserInfo?.following.find((item: { _id: string }) => item._id === userInfo?._id)

  const handleFollow = async () => {
    const res = await fetch(`api/user/${user?.id}/follow/${userInfo?._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const Info = await res.json();
    setUserInfo(Info)
    setLoaded(false)
    update()
  }

  return loaded || !isLoaded ? <SideBarLoader /> : (
    <>
      {UserInfo && <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
        <Link href={`/profile/${userInfo?._id}/posts`} className="flex flex-row items-center gap-2">
          {userInfo?.profilePhoto ?
            <Image
              src={userInfo?.profilePhoto}
              alt="profile photo"
              width={50}
              height={50}
              className="rounded-full grid-cols-1"
            /> : <AccountBoxIcon sx={{ width: 'auto', height: '2rem' }} />}
          <Box className="flex flex-col gap-1">
            <p className="text-small-semibold text-light-1">
              {userInfo?.firstName} {userInfo?.lastName}
            </p>
            <p className="text-subtle-medium text-light-3">
              @{userInfo?.username}
            </p>
          </Box>
        </Link>
        {user?.id !== userInfo?.clerkId &&
          (isFollowing ? (
            <PersonRemove
              sx={{ color: "#7857FF", cursor: "pointer", }}
              onClick={() => handleFollow()}
            />
          ) : (
            <PersonAddAlt
              sx={{ color: "#7857FF", cursor: "pointer" }}
              onClick={() => { handleFollow() }}
            />
          ))}
      </Box>}
    </>

  )
}

export default UserCard