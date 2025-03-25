import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./testimonials.module.css";
import apiClient from "@/api/client";

const Testimonials = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const { data } = await apiClient.get("/test/testimonial");

    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {data?.length > 0 && (
        <div>
          <h3 style={{ textAlign: "center" }}>Customer </h3>
          <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
            Testimonials
          </h1>
          <div style={{ width: "70%", margin: "0 auto" }}>
            <Slider {...settings}>
              {data?.map((item, id) => {
                return (
                  <div className={styles.user} key={id}>
                    <img src="/avatar.png" alt="" />
                    <p>{item.desc}</p>
                    <h3>{item.name}</h3>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
};

export default Testimonials;
