import Link from "next/link";
import React from "react";
import styles from "./page.module.css";

const RelatedItem = ({ data }) => {
  const short = data?.name?.replace(/(.{30})..+/, "$1");
  return (
    <Link
      href={`/packages/${data?._id}`}
      // href={`/packages/${encodeURIComponent(data?.name)}-${data?._id}`}
      className={styles.container}
    >
      <div className={styles.wrapperImage}>
        <img src={data.image[0]} alt="img" className={styles.image} />
      </div>
      <div className={styles.wrapperDetail}>
        <h4>{short}</h4>
        <p>${data?.price}</p>
      </div>
    </Link>
  );
};

export default RelatedItem;
