"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import useAuth from "@/auth/useAuth";
import apiClient from "@/api/client";
import swal from "sweetalert";
import { redirect, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const EditProfile = () => {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, logIn } = useAuth();
  if (!user) {
    redirect("/");
  }
  const updatePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      const result = await apiClient.put("/user/profile", {
        id: user.id,
        password: newPassword,
      });
      if (result.ok) {
        logIn(result.data.token);

        setNewPassword("");
        setConfirmPassword("");
        swal("Password Updated", "Successfully", "success");
      } else {
        swal("Error!", "Occured Retry", "error");
      }
    } else {
      swal("Error!", "Password mismatch retry", "error");
    }
  };

  return (
    <div className={styles.editprofileContainer}>
      <div className={styles.box}>
        <h2 className={styles.updateProfileHeading}>Update Password</h2>

        <form
          className={styles.updateProfileForm}
          encType="multipart/form-data"
          onSubmit={updatePasswordSubmit}
        >
          <div>
            <FontAwesomeIcon icon={faLock} color="white" />
            <input
              type="password"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <FontAwesomeIcon icon={faLock} color="white" />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Update"
            className={styles.updateProfileBtn}
          />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
