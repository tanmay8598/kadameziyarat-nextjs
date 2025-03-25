"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faCartShopping,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/auth/useAuth";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import Image from "next/image";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
    src: "/home.png",
  },

  {
    id: 2,
    title: "Packages",
    url: "/packages",
    src: "/donation.png",
  },
  {
    id: 12,
    title: "Flights",
    url: "/upcoming",
    src: "/airplane.png",
  },
  {
    id: 3,
    title: "Hotels",
    url: "/hotels",
    src: "/hotel.png",
  },

  {
    id: 4,
    title: "Blogs",
    url: "/blog",
    src: "/blog.png",
  },
  {
    id: 5,
    title: "About Us",
    url: "/about",
    src: "/about.png",
  },
  {
    id: 6,
    title: "Contact Us",
    url: "/contact",
    src: "/info.png",
  },
];

const Navbar = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { user } = useAuth();

  const handleItemMobile = (item) => {
    setAnimate(false);
    setModal(false);
    router.push(`${item.url}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.desktopnav}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt=""
            width={120}
            height={120}
            className={styles.avatar}
          />
        </Link>
        <div className={styles.links}>
          {!user && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid white",
                padding: "5px 10px",
                borderRadius: "3px",
                backgroundColor: "white",
                cursor: "pointer",
              }}
              onClick={() => router.push("/login")}
            >
              <FontAwesomeIcon
                icon={faCircleUser}
                color="#1f6e8c"
                style={{
                  cursor: "pointer",
                  fontSize: "23px",
                  paddingRight: "10px",
                }}
              />
              <p style={{ color: "#1f6e8c" }}>Register/Login</p>
            </div>
          )}
          {user && (
            <>
              <UserMenu />
            </>
          )}
        </div>
      </div>
      <div className={styles.mobilenav}>
        <div className={styles.center} onClick={() => router.push("/")}>
          <Image
            src="/logo.png"
            alt=""
            width={60}
            height={60}
            className={styles.avatar}
          />
        </div>
        {user && (
          <div className={styles.mobileUser}>
            <UserMenu />
          </div>
        )}

        {!user && (
          <div className={styles.mobileUser}>
            <FontAwesomeIcon
              icon={faCircleUser}
              color="white"
              onClick={() => router.push("/login")}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
        <div className={styles.menubtn} onClick={() => setModal(!modal)}>
          {modal ? (
            <FontAwesomeIcon icon={faTimes} color="white" />
          ) : (
            <FontAwesomeIcon icon={faBars} color="white" />
          )}
        </div>
        {modal && (
          <div
            className={animate ? styles.animatemobile : styles.mobilewrapper}
          >
            {links?.map((item, index) => {
              return (
                <div
                  className={styles.wrapperitem}
                  onClick={() => handleItemMobile(item)}
                  key={item.id}
                >
                  <img src={item.src} alt="" />
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
