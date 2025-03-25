"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import apiClient from "@/api/client";
import { useRouter } from "next/navigation";
import HotelItem from "@/components/HotelItem/HotelItem";
import { PuffLoader } from "react-spinners";

const HotelCategory = ({ params }) => {
  const [hotels, setHotels] = useState(undefined);
  const [loader, setLoader] = useState(true);
  const [sortp, setSortp] = useState(1);
  const [sorth, setSorth] = useState(1);

  const router = useRouter();

  const fetchHotelsByCategory = async () => {
    const { data } = await apiClient.get("/variation/get-hotel-by-category", {
      id: params?.hotelcategory,
      sort: sortp,
      sort2: sorth,
    });

    setHotels(data);
    setLoader(false);
  };

  useEffect(() => {
    fetchHotelsByCategory();
  }, [params, sortp, sorth]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <div className={styles.filterWrapper}>
          <span className={styles.srtByFltr__heading}>SORT BY:</span>
          <ul className={styles.srtByFltr__list}>
            {/* <li
              className={styles.srtByFltr_item}
              onClick={() => {
                setSorth(-1);
              }}
            >
              <span className={styles.srtByFltr__list__itemTitle}>
                Hotel Star
                <span className={styles.srtByFltr__list__itemSubTitle}>
                  (Highest First)
                </span>
              </span>
            </li>
            <li
              className={styles.srtByFltr_item}
              onClick={() => {
                setSorth(1);
              }}
            >
              <span className={styles.srtByFltr__list__itemTitle}>
                Hotel Star
                <span className={styles.srtByFltr__list__itemSubTitle}>
                  (Lowest First)
                </span>
              </span>
            </li> */}
            <li className={styles.srtByFltr_item} onClick={() => setSortp(-1)}>
              <span className={styles.srtByFltr__list__itemTitle}>
                Price
                <span className={styles.srtByFltr__list__itemSubTitle}>
                  (Highest First)
                </span>
              </span>
            </li>
            <li className={styles.srtByFltr_item} onClick={() => setSortp(1)}>
              <span className={styles.srtByFltr__list__itemTitle}>
                Price
                <span className={styles.srtByFltr__list__itemSubTitle}>
                  (Lowest First)
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      {!hotels ? (
        <div className={styles.loaderContainer}>
          {" "}
          <PuffLoader size={100} color="#003580" />
        </div>
      ) : hotels.length ? (
        <div>
          {hotels?.map((item, id) => {
            return <HotelItem item={item} key={id} />;
          })}
        </div>
      ) : (
        <div className={styles.notfoundContainer}>
          <h1 className={styles.errNotfoundText}>No hotels found</h1>
          <button
            className={styles.errNotfoundBtn}
            onClick={() => {
              router.back("/hotels");
            }}
          >
            Go back
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelCategory;
