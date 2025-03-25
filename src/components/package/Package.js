import React from "react";
import styles from "./package.module.css";
import Link from "next/link";

const Package = ({ detail }) => {
  return (
    <Link
      className={styles.packageContainer}
      href={`/packages/${encodeURIComponent(detail.name)}-${detail._id}`}
    >
      <img src={detail.image[0]} style={{ width: "100%" }} />
      <div className={styles.infoContainer}>
        <h3>{detail.name}</h3>
        <p>₹ {detail.price}/ 🧑‍🦲</p>
      </div>
    </Link>
  );
};

export default Package;
