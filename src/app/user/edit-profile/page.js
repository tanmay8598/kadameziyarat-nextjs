"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import useAuth from "@/auth/useAuth";
import apiClient from "@/api/client";
import swal from "sweetalert";
import { redirect, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faPhone } from "@fortawesome/free-solid-svg-icons";

const EditProfile = () => {
  const { user, logIn } = useAuth();
  const [name, setName] = useState(user ? user?.name : "");
  const [email, setEmail] = useState(user ? user?.email : "");
  const [phone, setPhone] = useState(user ? user?.phone : "");

  if (!user) {
    redirect("/");
  }
  const router = useRouter();

  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    const result = await apiClient.put("/user/profile", {
      id: user.id,
      name,
      phone,
      email,
    });
    if (result.ok) {
      logIn(result.data.token);
      setName("");
      setEmail("");
      setPhone("");
      swal("Profile Updated", "Successfully", "success");
      router.back();
    } else {
      swal("Error!", "Occured Retry", "error");
    }
  };

  return (
    <div className={styles.editprofileContainer}>
      <div className={styles.box}>
        <h2 className={styles.updateProfileHeading}>Update Profile</h2>

        <form
          className={styles.updateProfileForm}
          encType="multipart/form-data"
          onSubmit={updateProfileSubmit}
        >
          <div>
            <FontAwesomeIcon icon={faUser} color="white" />
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <FontAwesomeIcon icon={faPhone} color="white" />
            <input
              type="phone"
              placeholder="Phone"
              required
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <FontAwesomeIcon icon={faEnvelope} color="white" />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
