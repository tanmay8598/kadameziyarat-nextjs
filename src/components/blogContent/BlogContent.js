"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { Parser } from "html-to-react";
import apiClient from "@/api/client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const BlogContent = ({ blogid }) => {
  const [data, setData] = useState({});

  const fetchBlogs = async () => {
    const { data } = await apiClient.get(`/blog/blogbyid/${blogid}`);
    setData(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.hotelImages}>
        {data?.image?.map((photo, i) => (
          <div className={styles.hotelImgWrapper} key={i}>
            <img src={photo} alt="" className={styles.hotelImg} />
          </div>
        ))}
      </div>
      <div className={styles.mobileImageWrapper}>
        <Carousel
          autoPlay={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          showArrows={true}
        >
          {data?.image?.map((item, id) => {
            return (
              <div className={styles.wrapper} key={id}>
                <img src={item} alt={`image-${id}`} key={id} />
              </div>
            );
          })}
        </Carousel>
      </div>{" "}
      <div className={styles.contentDiv}>
        <div className={styles.author}>
          <img
            src="/Profile.png"
            alt=""
            width={50}
            height={50}
            className={styles.avatar}
          />
          <span className={styles.username}>{data?.user}</span>
        </div>
        <div className={styles.top}>
          <div className={styles.info}>
            <h1 className={styles.title}>{data.heading}</h1>
            {data?.categories?.map((item, id) => {
              return (
                <p className={styles.category} key={id}>
                  #{item}
                </p>
              );
            })}
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.text}>{Parser().parse(data.content)}</p>
        </div>
        {data?.tags?.map((item, id) => {
          return (
            <p className={styles.category} key={id}>
              #{item}
            </p>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default BlogContent;
