"use client";
import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "./banner.module.css";

function Banner({ images }) {
  return (
    <div className={styles.container}>
      <Carousel
        autoPlay={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        // showArrows={true}
      >
        {images?.map((item, id) => {
          return (
            <div className={styles.wrapper} key={id}>
              <img src={item.img} alt={`image-${id}`} key={id} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Banner;
