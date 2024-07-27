"use client";

import { useUser } from "@clerk/nextjs";
import PostCard from "../../components/cards/PostCard";
import { useEffect, useState } from "react";
import { creatorAndPostFC, creatorFC } from "@/components/GeneralTypes";
import SideBarLoader from "@/components/SideBarLoader";
import { Box } from "@mui/material";

interface loggedInUserInterface {
  id: string
}

const Home = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [feedPost, setFeedPost] = useState<creatorAndPostFC | null>();

  const getFeedPost = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();
    setFeedPost(data);
    setLoading(false);
  };

  useEffect(() => {
    getFeedPost()
  }, []);

  return loading || !isLoaded ? (
    <SideBarLoader />
  ) : (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', justifyContent: 'center', width: '100%', }}>
      {feedPost?.map((post: creatorAndPostFC) => (
        <PostCard
          key={post._id}
          post={post}
          creator={post.creator as creatorFC}
          loggedInUser={user as loggedInUserInterface}
          update={getFeedPost}
        />
      ))}
    </Box>
  );
};

export default Home;