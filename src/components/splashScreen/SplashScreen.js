import React from "react";
import styles from "./page.module.css";

const SplashScreen = ({ loading }) => {
  return (
    <div className={`${styles.splashscreen} ${loading ? styles.visible : ""}`}>
      {/* <div className={`splash-screen${loading ? " visible" : ""}`}> */}
      <div className={styles.splashcontent}>
        <h1 className={styles.animationtext}>
          <span>Salam</span>
          <span>Walekum</span>
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
