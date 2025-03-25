import React from "react";
import styles from "./page.module.css";
import HotelCard from "../hotelCard/HotelCard";

const FeaturedHotels = ({ hotels }) => {
  return (
    <div className={styles.fpContainer}>
      <div className={styles.description}>
        <h1 className={styles.propertiesByArea}>Hotels guests love</h1>
        <div className={styles.vestibulumAnteIpsum}>
          Find accommodation that fits your needs.
        </div>
      </div>
      <div className={styles.fp}>
        {hotels?.map((item, id) => {
          return <HotelCard data={item} key={id} />;
        })}
      </div>
    </div>
  );
};

export default FeaturedHotels;
