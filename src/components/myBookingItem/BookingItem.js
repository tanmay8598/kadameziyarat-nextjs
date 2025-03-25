import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faChildren } from "@fortawesome/free-solid-svg-icons";

const BookingItem = ({ item }) => {
  var options = { month: "long", day: "numeric", year: "numeric" };
  const arrivalDate = new Date(item?.arrivalDate).toLocaleDateString(
    "en-US",
    options
  );
  const departureDate = new Date(item?.departureDate).toLocaleDateString(
    "en-US",
    options
  );
  return (
    <Link className={styles.searchItem} href={`/booking/${item?._id}`}>
      <div className={styles.siWrapper}>
        <img src={item?.package?.image[0]} alt="" className={styles.siImg} />

        <div>
          <div className={styles.siRating}>
            <button>{item?.package?.rating}</button>
            <span>Excellent</span>
            <p>({item?.package?.reviews?.length} Ratings)</p>
          </div>

          <div className={styles.siDesc}>
            <h1 className={styles.siTitle}>{item?.package?.name}</h1>
            <div className={styles.siHotelInfo}>
              <span className={styles.siDistance}>500m from center</span>
              <span className={styles.siSubtitle}>
                | {item?.package?.hotel}
              </span>
            </div>
          </div>
          {/* <StarRatingComponent
            name="rate1"
            starCount={5}
            value={item?.package?.rating}
          /> */}
          <Rating
            initialValue={item?.package?.rating}
            size={15}
            /* Available Props */
          />
          <div className={styles.dates}>
            <FontAwesomeIcon
              icon={faCalendar}
              color="#0071c2"
              style={{ marginRight: "7px" }}
            />
            <p>
              {arrivalDate} - {departureDate}{" "}
            </p>
          </div>
          <div className={styles.siMobileDetails}>
            <div>
              {" "}
              <FontAwesomeIcon
                icon={faChildren}
                color="#0071c2"
                style={{ marginRight: "7px" }}
              />{" "}
              x {item?.persons}
            </div>
            <span className={styles.siPrice}>$ {item?.totalPrice}</span>
            <span className={styles.siTaxOp}>Includes taxes and fees</span>
          </div>
        </div>
      </div>

      <div className={styles.siDetails}>
        <div className={styles.siDetailTexts}>
          <div>
            {" "}
            <FontAwesomeIcon
              icon={faChildren}
              color="#0071c2"
              style={{ marginRight: "7px" }}
            />{" "}
            x {item?.persons + item?.child + item?.infant}
          </div>

          <span className={styles.siPrice}>$ {item?.totalPrice}</span>
          <span className={styles.siTaxOp}>Includes taxes and fees</span>
        </div>
      </div>
    </Link>
  );
};

export default BookingItem;
