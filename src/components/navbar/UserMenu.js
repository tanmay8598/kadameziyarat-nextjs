"use client";
import React, { useCallback, useState } from "react";
import Avatar from "./Avatar";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/auth/useAuth";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { googleLogout } from "@react-oauth/google";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { logOut } = useAuth();
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleLogOut = () => {
    swal("Log Out", "You are logged out successfully", "success");
    logOut();
    googleLogout();
  };

  return (
    <div style={{ position: "relative" }}>
      <div onClick={toggleOpen} className={styles.outlineMenu}>
        <div className={styles.brsIcon}>
          <FontAwesomeIcon
            icon={faBars}
            color="#0039a6"
            style={{ marginRight: "11px" }}
          />
        </div>

        <Avatar />
      </div>
      {isOpen && (
        <div className={styles.menuItemContainer}>
          <div
            className={styles.menuItem}
            onClick={() => {
              setIsOpen(false);
              router.push("/user");
            }}
          >
            <p>My account</p>
          </div>
          {/* <div
            className={styles.menuItem}
            onClick={() => {
              setIsOpen(false);
              router.push("/booking");
            }}
          >
            <p>My bookings</p>
          </div> */}
          <div
            className={styles.menuItem}
            onClick={() => {
              setIsOpen(false);
              router.push("/testimonial");
            }}
          >
            <p>Testimonial</p>
          </div>

          <div className={styles.menuItem} onClick={handleLogOut}>
            <p>Logout</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
