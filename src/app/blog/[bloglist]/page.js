"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import apiClient from "@/api/client";
import { Parser } from "html-to-react";
import { useRouter } from "next/navigation";

const BlogCategory = ({ params }) => {
  const [blogs, setBlogs] = useState([]);

  const router = useRouter();

  const fetchBlogsByCategory = async () => {
    const { data } = await apiClient.get("/blog/blogsbycategory", {
      categoryId: params?.bloglist,
    });

    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogsByCategory();
  }, []);


  return (
    <div className={styles.mainContainer}>
      {blogs?.blogs?.length < 1 ? (
        <div className={styles.div1}>
          <h1 className={styles.errorH1}>No blogs found!</h1>
          <button
            className={styles.backBtn}
            onClick={() => {
              router.back("/blog");
            }}
          >
            Go back
          </button>
        </div>
      ) : (
        <div className={styles.blogsWrapper}>

          {blogs?.blogs?.map((item) => (
            <Link
              href={`/blog/${params?.bloglist}/${item?._id}`}
              className={styles.container}
              key={item.id}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={item?.image[0]}
                  alt=""
                  width={300}
                  height={200}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h2 className={styles.title}>{item.heading}</h2>
                <p className={styles.author}>
                  <img
                    src="/Profile.png"
                    alt=""
                    width={20}
                    height={20}
                    className={styles.avatar}
                  />
                  {item.user}
                </p>
                <p className={styles.desc}> {Parser().parse(item.content)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogCategory;
