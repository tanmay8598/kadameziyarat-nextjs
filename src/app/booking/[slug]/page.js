"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import apiClient from "@/api/client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

const BookingDetail = ({ params }) => {
  const [data, setData] = useState();
  const product = data?.package;
  const persons = data?.persons;

  const total =
    data?.persons * product?.price +
    data?.child * product?.priceChild +
    data?.infant * product?.priceInfant;

  const discountAmount = total * (product?.discount / 100);
  const total2 = total - discountAmount;
  var options = { month: "long", day: "numeric", year: "numeric" };

  const arrivalDate = new Date(data?.arrivalDate).toLocaleDateString(
    "en-US",
    options
  );
  const departureDate = new Date(data?.departureDate).toLocaleDateString(
    "en-US",
    options
  );

  useEffect(() => {
    fecthBookings();
  }, []);

  const fecthBookings = async () => {
    const { data } = await apiClient.get("/booking/bookingbyid", {
      id: params?.slug,
    });

    setData(data);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <h4>Your booking details</h4>
          <div className={styles.leftDateContainer}>
            <div>
              <p>Arrival</p>
              <h4>{arrivalDate}</h4>
            </div>
            <div>
              <p>Departure</p>
              <h4>{departureDate}</h4>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <p>Total length of stay:</p>
            <h4>{product?.days} Days</h4>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <h4>Package details</h4>
          <Link
            className={styles.packageDetail1}
            href={`/packages/${product?._id}`}
          >
            <img
              src={product?.image[0]}
              alt="package-img"
              className={styles.pkgImg}
            />
            <div className={styles.hotelInfo}>
              <h2>{product?.name}</h2>
              <p style={{ marginTop: "10px" }}>
                <FontAwesomeIcon
                  icon={faHotel}
                  color="#0039a6"
                  style={{ marginRight: "10px" }}
                />
                {product?.hotel}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.priceContainer}>
        <h4>Your price summary</h4>
        <div className={styles.row}>
          <p>
            Price
            <span style={{ fontSize: "12px", marginLeft: "5px" }}>
              ( *per Adult x {data?.persons})
            </span>
          </p>
          <p>$ {product?.price}</p>
        </div>
        {data?.child > 0 && (
          <div className={styles.row}>
            <p>
              Price
              <span style={{ fontSize: "12px", marginLeft: "5px" }}>
                ( *per Child x {data?.child})
              </span>
            </p>
            <p>$ {product?.priceChild}</p>
          </div>
        )}
        {data?.infant > 0 && (
          <div className={styles.row}>
            <p>
              Price
              <span style={{ fontSize: "12px", marginLeft: "5px" }}>
                ( *per Infant x {data?.infant})
              </span>
            </p>
            <p>$ {product?.priceInfant}</p>
          </div>
        )}
      </div>
      <div className={styles.totalPriceContainer}>
        <h3>
          Sub Total
          <span style={{ fontSize: "12px", marginLeft: "5px" }}>
            ( x {persons} persons)
          </span>
        </h3>
        <h3>$ {total}</h3>
      </div>
      <div className={styles.totalPriceContainer}>
        <h3>
          Discount
          <span style={{ fontSize: "12px", marginLeft: "5px" }}>
            ( x {persons} persons)
          </span>
        </h3>
        <h3>$ {discountAmount}</h3>
      </div>
      <div className={styles.totalPriceContainer}>
        <h3>
          Total
          <span style={{ fontSize: "12px", marginLeft: "5px" }}></span>
        </h3>
        <h3>$ {total2}</h3>
      </div>
    </div>
  );
};

export default BookingDetail;
