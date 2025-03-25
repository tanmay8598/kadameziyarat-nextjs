"use client";
import React, { useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "./page.module.css";
import ReactPlayer from "react-player";
import apiClient from "@/api/client";

const VideoSlide = ({ url, isSelected }) => {
  const playerRef = useRef();

  useEffect(() => {
    playerRef.current.seekTo(0); // reset video to start
  }, [isSelected]);

  return (
    <div>
      <div className={styles.desktop}>
        <ReactPlayer
          width="80%"
          url={url}
          ref={playerRef}
          playing={isSelected}
          className={styles.player}
          controls="true"
        />
      </div>
      <div className={styles.mobile}>
        <ReactPlayer
          width="100%"
          height="100%"
          url={url}
          ref={playerRef}
          playing={isSelected}
          className={styles.player}
          controls="true"
        />
      </div>
    </div>
  );
};

const ReviewSlider = () => {
  const [videos, setVideos] = useState([]);

  const fetchReviews = async () => {
    const { data } = await apiClient.get("/review/get");

    setVideos(data?.reviews);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Hear from our Customers</h1>
      <Carousel showArrows={true}>
        {videos?.map((item, id) => {
          return (
            <div key={id}>
              <VideoSlide url={item.videoLink} />
              <div className={styles.myCarousel}>
                <h2>{item.title}</h2>
                <h3>{item.name}</h3>
                <p>{item.message}</p>
              </div>
            </div>
          );
        })}
      </Carousel>{" "}
    </div>
  );
};

export default ReviewSlider;
