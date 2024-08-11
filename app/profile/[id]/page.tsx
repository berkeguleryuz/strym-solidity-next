"use client"
import ProfilePage from "@/components/ProfilePage";
import React from "react";

type Props = {};

const ProfilePageID = ({ params }: { params: { id: any } }) => {
  return (
    <div>
      <ProfilePage />
    </div>
  );
};

export default ProfilePageID;
