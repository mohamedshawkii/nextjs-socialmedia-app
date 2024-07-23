"use client"

import ProfileCard from "@/components/cards/ProfileCard";
import UserCard from "@/components/cards/UserCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { creatorFC } from "@/components/GeneralTypes";
import SideBarLoader from "@/components/SideBarLoader";

const Followers = () => {
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

  return loading ? (
    <SideBarLoader />
  ) : (
    <div className="flex flex-col gap-9">
      {userData && <ProfileCard userData={userData} activeTab="Followers" />}
      <div className="flex flex-col gap-9">
        {userData?.followers?.map((person: creatorFC) => (
          <UserCard key={person._id} userInfo={person} update={getUser} />
        ))}
      </div>
    </div>
  );
};

export default Followers;