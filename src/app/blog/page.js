"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import apiClient from "@/api/client";

const Blog = () => {
  const [categories, setCategories] = useState([]);

  const fetchBlogCategories = async () => {
    const { data } = await apiClient.get("/variation/get-categories");

    setCategories(data);
  };

  useEffect(() => {
    fetchBlogCategories();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h2 >Blog categories</h2>
      <div className={styles.categoryContainer}>
        {categories?.map((item, id) => {
          return (
            <Link
              key={id}
              className={styles.categoryCard}
              href={`/blog/${item?._id}`}
            >
              <div className={styles.card_image}>
                <img src={item?.image} className={styles.cardImg} />
              </div>
              <h3 className={styles.categoryHeading}>{item?.name}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
