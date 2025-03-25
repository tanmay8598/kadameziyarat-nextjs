import React from "react";
import styles from "./page.module.css";
import PackageCard from "../packageCard/PackageCard";

const FeaturedPackages = ({ packages }) => {
  return (
    <div className={styles.fpContainer}>
      <div className={styles.description}>
        <h1 className={styles.propertiesByArea}>Top Selling Packages</h1>
        <div className={styles.vestibulumAnteIpsum}>
          Save extra with our exclusive deals!
        </div>
      </div>
      <div className={styles.fp}>
        {packages?.map((item, id) => {
          return <PackageCard data={item} key={id} />;
        })}
      </div>
    </div>
  );
};

export default FeaturedPackages;
