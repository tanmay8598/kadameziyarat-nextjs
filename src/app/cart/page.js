"use client";
import React from "react";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "@/redux/cartSlice";
import Image from "next/image";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import { redirect, useRouter } from "next/navigation";
import swal from "sweetalert";

const Cart = () => {
  const items = useSelector((state) => state.cart.cart)[0];
  const product = items?.product;
  const persons = items?.persons;
  const total =
    persons?.adult * product?.price +
    persons?.children * product?.priceChild +
    persons?.infant * product?.priceInfant;

  const discountAmount = total * (product?.discount / 100);
  const total2 = total - discountAmount;
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useAuth();

  var options = { month: "long", day: "numeric", year: "numeric" };

  const arrivalDate = new Date(items?.arrivalDate).toLocaleDateString(
    "en-US",
    options
  );
  const departureDate = new Date(items?.departureDate).toLocaleDateString(
    "en-US",
    options
  );

  var timeDiff = Math.abs(
    new Date(items?.departureDate).getTime() -
      new Date(items?.arrivalDate).getTime()
  );
  var numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const handleClearCart = () => {
    dispatch(clear());
  };

  const handleSubmit = async () => {
    const result = await apiClient.post("/booking/create-booking", {
      package: product?._id,
      paymentMethod: "COD",
      itemsPrice: product?.price,
      totalPrice: total,
      userId: user?.id,
      persons: persons.adult,
      child: persons.children,
      infant: persons.infant,
      arrivalDate: items?.arrivalDate,
      departureDate: items?.departureDate,
    });
    if (result.ok) {
      dispatch(clear());
      swal("Hurray!", "Package Booked", "success");
      router.push("/booking");
    } else {
      swal("Please Login to Book Packages!");
    }
  };

  return (
    <>
      {items ? (
        <div className={styles.mainContainer}>
          <div className={styles.container}>
            <div className={styles.leftContainer}>
              <h3>Your booking details</h3>
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
                <h4>{numberOfNights} nights</h4>
              </div>
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={handleClearCart}
                  className={styles.submitReview}
                >
                  Clear booking
                </button>
              </div>
            </div>
            <div className={styles.rightContainer}>
              <h3>Package details</h3>
              <div className={styles.packageDetail1}>
                <img
                  src={product?.image[0]}
                  alt="package-img"
                  className={styles.pkgImg}
                />
                <div className={styles.hotelInfo}>
                  <h4>Package: {product?.name}</h4>
                  <p style={{ marginTop: "10px" }}>Hotel: {product?.hotel}</p>
                  <p className={styles.packageDesc}>{product?.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.priceContainer}>
            <h4>Your price summary</h4>
            <div className={styles.row}>
              <p>
                Price
                <span style={{ fontSize: "12px", marginLeft: "5px" }}>
                  ( *per Adult x {persons.adult})
                </span>
              </p>
              <p>$ {product?.price}</p>
            </div>
            {persons?.children > 0 && (
              <div className={styles.row}>
                <p>
                  Price
                  <span style={{ fontSize: "12px", marginLeft: "5px" }}>
                    ( *per Child x {persons.children})
                  </span>
                </p>
                <p>$ {product?.priceChild}</p>
              </div>
            )}
            {persons?.infant > 0 && (
              <div className={styles.row}>
                <p>
                  Price
                  <span style={{ fontSize: "12px", marginLeft: "5px" }}>
                    ( *per Infant x {persons.infant})
                  </span>
                </p>
                <p>$ {product?.priceInfant}</p>
              </div>
            )}
            {/* <div className={styles.row}>
              <p>
                Discount
                <span style={{ fontSize: "12px", marginLeft: "5px" }}>
                  ({product?.discount}%)
                </span>
              </p>
              <p>amount</p>
            </div> */}
          </div>
          <div className={styles.totalPriceContainer}>
            <h4>
              Sub Total
              <span style={{ fontSize: "12px", marginLeft: "5px" }}></span>
            </h4>
            <h4>$ {total}</h4>
          </div>
          <div className={styles.totalPriceContainer}>
            <h4>
              Discount ({product?.discount}%)
              <span style={{ fontSize: "12px", marginLeft: "5px" }}></span>
            </h4>
            <h4>$ {discountAmount}</h4>
          </div>
          <div className={styles.totalPriceContainer}>
            <h3>
              Total
              <span style={{ fontSize: "12px", marginLeft: "5px" }}>
                {/* ( x {persons} persons) */}
              </span>
            </h3>
            <h3>$ {total2}</h3>
          </div>
          <button onClick={handleSubmit} className={styles.submitReview}>
            Pay now
          </button>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.emptyContainer}>
            <Image
              src="/cart-empty.png"
              width={100}
              height={100}
              alt="Picture of the author"
            />
            <h2>Cart is empty</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
