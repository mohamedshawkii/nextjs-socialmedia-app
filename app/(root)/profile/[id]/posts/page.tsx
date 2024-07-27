"use client";

import { useUser } from "@clerk/nextjs";
import PostCard from "../../../../../components/cards/PostCard";
import ProfileCard from "../../../../../components/cards/ProfileCard";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { creatorFC } from "@/components/GeneralTypes";
import { creatorAndPostFC } from "@/components/GeneralTypes";
import SideBarLoader from "@/components/SideBarLoader";
import { Box } from "@mui/material";

interface loggedInUserType {
  id: string;
}

const ProfilePosts = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<creatorFC | null>();

  const getUser = async () => {
    const response = await fetch(`/api/user/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [id]);

  const { user, isLoaded } = useUser();

  return loading || !isLoaded ? (
    <SideBarLoader />
  ) : (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      {userData && <ProfileCard userData={userData} />}
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '2.25rem'}}>
        {userData && userData?.posts?.map((post: creatorAndPostFC) => (
          <PostCard
            key={post._id}
            post={post}
            creator={post.creator as creatorFC}
            loggedInUser={user as loggedInUserType}
            update={getUser}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProfilePosts;