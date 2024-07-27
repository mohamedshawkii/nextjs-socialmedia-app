"use client"

import ProfileCard from "@/components/cards/ProfileCard";
import UserCard from "@/components/cards/UserCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { creatorFC } from "@/components/GeneralTypes";
import SideBarLoader from "@/components/SideBarLoader";
import { Box, Grid } from "@mui/material";


const Following = () => {
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

    return loading ? <SideBarLoader /> : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
            {userData && <ProfileCard userData={userData} />}
            <Box className={'grid grid-cols-3 gap-2 justify-start items-start'} sx={{ padding: '1.25rem', }}>
                {userData && userData?.following?.map((person: creatorFC) => (
                    <UserCard key={person._id} userInfo={person} update={getUser} />
                ))}
            </Box>
        </Box>
    );
};

export default Following;