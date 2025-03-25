import Rating from "@mui/material/Rating";
import React from "react";
import styles from "./page.module.css";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    // <div className={styles.reviewCard}>
    //   <img src="/Profile.png" alt="User" />
    //   <p>{review.name}</p>
    //   <Rating {...options} />
    //   <span className={styles.reviewCardComment}>{review.comment}</span>
    // </div>
    <div className={styles.review}>
      <div className={styles.user}>
        <img className={styles.pp} src="/avatar.png" alt="" />
        <div className={styles.info}>
          <span>{review.name}</span>
          <div className={styles.country}>
            <span>Customer</span>
          </div>
        </div>
      </div>

      <div className={styles.stars}>
        <Rating {...options} />
        {/* <span>{review.star}</span> */}
      </div>
      <p style={{ textAlign: "justify" }}>{review.comment}</p>
      <div className={styles.helpful}>
        <span>Helpful?</span>
        <img src="/like.png" alt="" />
        <span>Yes</span>
        <img src="/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default ReviewCard;
