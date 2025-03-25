import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

const PropertyByArea = ({ categories }) => {
  const row1 = categories?.slice(0, 3);
  const row2 = categories?.slice(3, 5);
  const row3 = categories?.slice(5, 8);

  return (
    <div className={styles.propertiesByAreaImagesSect}>
      <div className={styles.description}>
        <h1 className={styles.propertiesByArea}>Trending destinations</h1>
        <p className={styles.vestibulumAnteIpsum}>
          Most popular choices for travellers
        </p>
      </div>
      <div className={styles.cards}>
        <div className={styles.cardwrapper}>
          <div className={styles.row1}>
            {row1?.map((item, id) => {
              return (
                <Link
                  className={styles.card1}
                  style={{ backgroundImage: `url(${item.image})` }}
                  href={`/hotels/${item._id}`}
                  key={id}
                >
                  <div className={styles.text}>
                    <div className={styles.centerville}>{item?.name}</div>
                    {item?.count && (
                      <div className={styles.listings}>
                        {item?.count}
                        {"  "}
                        Hotels available
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className={styles.row2}>
            {row2?.map((item, id) => {
              return (
                <Link
                  className={styles.card4}
                  style={{ backgroundImage: `url(${item.image})` }}
                  href={`/hotels/${item._id}`}
                  key={id}
                >
                  <div className={styles.text}>
                    <div className={styles.centerville}>{item?.name}</div>
                    {item?.count && (
                      <div className={styles.listings}>
                        {item?.count}
                        {"  "}
                        Hotels available
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className={styles.row1}>
            {row3?.map((item, id) => {
              return (
                <Link
                  className={styles.card1}
                  style={{ backgroundImage: `url(${item.image})` }}
                  href={`/hotels/${item._id}`}
                  key={id}
                >
                  <div className={styles.text}>
                    <div className={styles.centerville}>{item?.name}</div>
                    {item?.count && (
                      <div className={styles.listings}>
                        {item?.count}
                        {"  "}
                        Hotels available
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.mobileCards}>
        {categories?.map((item, id) => {
          return (
            <Link
              className={styles.card1}
              href={`/hotels/${item._id}`}
              key={id}
            >
              <img src={item.image} alt="" className={styles.mobileImg} />

              <h3>{item?.name}</h3>
              {item?.count && <p>{item?.count} Hotels available</p>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyByArea;
