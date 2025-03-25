import React from "react";
import { PuffLoader } from "react-spinners";
import styles from "./page.module.css";

const loading = () => {
  return (
    <div className={styles.loaderContainer}>
      <PuffLoader size={100} color="#003580" />
    </div>
  );
};

export default loading;
