import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
// import StarRatingComponent from "react-star-rating-component";
import { Rating } from "react-simple-star-rating";

const SearchItem = ({ item }) => {
  const np = (item?.price - (item?.discount / 100) * item?.price).toFixed(0);

  return (
    <Link className={styles.searchItem} href={`/packages/${item?._id}`}>
      <div className={styles.siWrapper}>
        <img src={item?.image[0]} alt="" className={styles.siImg} />

        <div>
          <div className={styles.siRating}>
            <button>{item?.rating}</button>
            <span>Excellent</span>
            <p>({item.reviews.length} Ratings)</p>
          </div>

          <div className={styles.siDesc}>
            <h1 className={styles.siTitle}>{item?.name}</h1>
            <div className={styles.siHotelInfo}>
              <span className={styles.siDistance}>500m from center</span>
              <span className={styles.siSubtitle}>| {item?.hotel}</span>
            </div>
          </div>
          {/* <StarRatingComponent
            name="rate1"
            starCount={5}
            value={item?.rating}
          /> */}
          <Rating
            initialValue={item?.rating}
            size={15}
            readonly={true}
            /* Available Props */
          />
          <p className={styles.hotelDescription}>{item?.description}</p>
          <div className={styles.siMobileDetails}>
            {item?.discount > 0 && (
              <span className={styles.siCutPrice}>$ {item?.price}</span>
            )}
            <span className={styles.siPrice}>$ {np}</span>
            <span className={styles.siTaxOp}>Includes taxes and fees</span>
          </div>
        </div>
      </div>

      <div className={styles.siDetails}>
        <div className={styles.siDetailTexts}>
          {item?.discount > 0 && (
            <span className={styles.siCutPrice}>$ {item?.price}</span>
          )}

          <span className={styles.siPrice}>$ {np}</span>
          <span className={styles.siTaxOp}>Includes taxes and fees</span>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
