"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import apiClient from "@/api/client";

const Hotels = () => {
  const [categories, setCategories] = useState([]);

  const fetchBlogCategories = async () => {
    const { data } = await apiClient.get("/variation/get-hotel-categories");
    setCategories(data);
  };

  useEffect(() => {
    fetchBlogCategories();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h3>Check hotels around the world</h3>
      <div className={styles.categoryContainer}>
        {categories?.map((item, id) => {
          return (
            <Link
              key={id}
              className={styles.categoryCard}
              href={`/hotels/${item._id}`}
            >
              <div className={styles.card_image}>
                <img src={item?.image} className={styles.cardImg} />
              </div>
              <p className={styles.categoryHeading}>{item?.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Hotels;
