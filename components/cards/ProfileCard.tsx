import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { tabs } from "../../constants/index";
import Link from "next/link";
import { MdPersonAddAlt } from "react-icons/md";
import { IoPersonRemove } from "react-icons/io5";
import { creatorFC } from "../GeneralTypes";
import SideBarLoader from "../SideBarLoader";
import { Box, Typography } from "@mui/material";
import { usePathname } from "next/navigation";


const ProfileCard = ({ userData }: { userData: creatorFC,}) => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<creatorFC | null>();
  const pathName = usePathname()

  const getUser = async () => {
    const response = await fetch(`/api/user/${user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserInfo(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const isFollowing = userInfo?.following?.find(
    (item: { _id: string }) => item._id === userData._id
  );

  const handleFollow = async () => {
    const response = await fetch(
      `/api/user/${user?.id}/follow/${userData._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserInfo(data);
  };

  return loading || !isLoaded ? (
    <SideBarLoader />
  ) : (
    <>
      {userData &&
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1.25rem' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <Image
                src={userData.profilePhoto}
                alt="profile photo"
                width={100}
                height={100}
                className="rounded-full md:max-lg:hidden"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                  <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>
                    {userData.firstName} {userData.lastName}
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }} >
                    @{userData.username}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1.5rem', }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: '300' }} >{userData.posts.length} <span className="ml-1">Posts</span></Typography>
                  <Typography sx={{ fontSize: '14px', fontWeight: '300' }} >{userData.followers.length} <span className="ml-1">Followers</span></Typography>
                  <Typography sx={{ fontSize: '14px', fontWeight: '300' }} >{userData.following.length} <span className="ml-1">Following</span></Typography>
                </Box>
              </Box>
            </Box>

            {user?.id !== userData.clerkId &&
              (isFollowing ? (
                <IoPersonRemove
                  onClick={() => handleFollow()}
                />
              ) : (
                <MdPersonAddAlt
                  onClick={() => handleFollow()}
                />
              ))}
          </Box>

          <Box sx={{ display: 'flex', gap: '1.5rem', }}>
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                className={`${`${`/profile/${userData._id}/${tab.link}`}` === pathName ? 'text-white font-semibold' : ''}`} 
                href={`/profile/${userData._id}/${tab.link}`}
              >
                {tab.name}
              </Link>
            ))}
          </Box>
        </Box>
      }
    </>
  );
};

export default ProfileCard;