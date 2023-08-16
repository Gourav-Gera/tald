'use client';
import React from "react";
import { useSession } from "next-auth/react";
import { Box } from "@mui/material";
import { LoginButton, LogoutButton } from "../buttons/buttons.component";

const Profile = () => {
  const session = useSession();
  return <Box>{session?.data?.user ? <LogoutButton /> : <LoginButton />}</Box>;
};

export default Profile;
