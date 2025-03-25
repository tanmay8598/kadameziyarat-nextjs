import React from "react";
import styles from "./tabs.module.css";
import Link from "next/link";

const Tabs = ({ categories }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.tabsWrapper}>
        <Link className={styles.tabItem} href="/packages">
          <img src="/donation.png" alt="" />
          <p>Packages</p>
        </Link>
        <Link className={styles.tabItem} href="/hotels">
          <img src="/hotel.png" alt="" />
          <p>Hotels</p>
        </Link>
        <Link className={styles.tabItem} href="/blog">
          <img src="/blog.png" alt="" />
          <p>Blogs</p>
        </Link>
        <Link className={styles.tabItem} href="/blog">
          <img src="/taxi.png" alt="" />
          <p>Cabs</p>
        </Link>
      </ul>
    </div>
  );
};

export default Tabs;
