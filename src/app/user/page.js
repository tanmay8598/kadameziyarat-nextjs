"use client";
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import useAuth from "@/auth/useAuth";
import { redirect } from "next/navigation";

const ProfileScreen = () => {
  const { user } = useAuth();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className={styles.profileContainer}>
      <div>
        <h1>My Profile</h1>
        <img src="/avatar.png" alt="img" />
        <Link href="/user/edit-profile">Edit Profile</Link>
      </div>
      <div>
        <div>
          <h4>Full Name</h4>
          <p>{user?.name}</p>
        </div>
        <div>
          <h4>Email</h4>
          <p>{user?.email}</p>
        </div>

        <div>
          <Link href="/user/update-password">Change Password</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
