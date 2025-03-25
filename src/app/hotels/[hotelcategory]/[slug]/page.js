"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import apiClient from "@/api/client";
import ReviewCard from "@/components/review/ReviewCard";
import { Rating as Rating2 } from "react-simple-star-rating";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import useAuth from "@/auth/useAuth";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import { PuffLoader } from "react-spinners";
import RelatedItem from "@/components/realtedItem/RelatedItem";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import RelatedHotelItem from "@/components/relatedHotelItem/RelatedHotelItem";

const Hotel = ({ params }) => {
  const hotelId = params.slug;
  const router = useRouter();
  const { user } = useAuth();

  const [slideNumber, setSlideNumber] = useState(0);
  const [open2, setOpen2] = useState(false);
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [relatedItems, setRelatedItems] = useState([]);
  //product review comment
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen2(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const result = await apiClient.get("/hotel/get-hotel-by-id", {
        productId: hotelId,
      });

      if (!result.ok) {
        return notFound();
      }

      setData(result.data);
      fetchRelatedItems(result.data.category);
      setIsLoading(false);
    };
    getData();
  }, []);

  const fetchRelatedItems = async (hotelcategory) => {
    const { data } = await apiClient.get("/variation/get-hotel-by-category", {
      id: hotelcategory,
    });

    setRelatedItems(data.slice(0, 4));
  };

  const reviewSubmitHandler = async () => {
    const result = await apiClient.post("/hotel/create-review", {
      serviceId: data?._id,
      rating,
      comment,
      user,
    });
    if (result.ok) {
      swal("Review Submitted");
    }
    setOpen(false);
    window.location.reload();
  };

  // console.log(data);

  return (
    <div>
      <div className={styles.hotelContainer}>
        {open2 && (
          <div className={styles.slider}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles.close}
              onClick={() => setOpen2(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className={styles.arrow}
              onClick={() => handleMove("l")}
            />
            <div className={styles.sliderWrapper}>
              <img
                src={data?.image[slideNumber]}
                alt=""
                className="sliderImg"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className={styles.arrow}
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <PuffLoader size={100} color="#003580" />
          </div>
        ) : (
          <div className={styles.hotelWrapper}>
            <h2 className={styles.hotelTitle}>{data?.name}</h2>
            <div className={styles.hotelAddress}>
              <FontAwesomeIcon icon={faLocationDot} color="#003580" />
              <span>{data?.nearest}</span>
            </div>
            <span className={styles.hotelDistance}>
              Excellent location – {data?.nearest}
            </span>
            <div>
              <Rating2
                initialValue={data?.hotelRating}
                size={15}
                readonly={true}
                /* Available Props */
              />
              <span className={styles.hotelPriceHighlight}>
                | {data?.category}
              </span>
            </div>

            <div className={styles.hotelImages}>
              {data?.image.map((photo, i) => (
                <div className={styles.hotelImgWrapper} key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className={styles.hotelImg}
                  />
                </div>
              ))}
            </div>
            <div className={styles.mobileImageWrapper}>
              {data?.image?.length > 0 && (
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
              )}
            </div>
            <div className={styles.hotelDetails}>
              <div className={styles.mobilehotelDetailsPrice}>
                <h1>Perfect for your stay!</h1>
                <span>
                  {data?.nearest}, this property has an excellent location
                </span>
                <h2>
                  <b>${data?.price}</b>({data?.rating} Star rating)
                </h2>

                <Link
                  href={{
                    pathname: "/inquiry/Hotel",
                    query: {
                      id: data?._id,
                      name: data?.name,
                    },
                  }}
                  className={styles.inquiryBtn}
                >
                  Inquire Hotel
                </Link>
              </div>
              <div className={styles.hotelDetailsTexts}>
                <h3 className={styles.hotelTitle}>Overview</h3>
                <p className={styles.hotelDesc}>{data?.description}</p>
                <h3 className={styles.hotelTitleDetails}>Details</h3>
                {data?.details?.map((item, id) => {
                  return (
                    <p key={id} className={styles.hotelDesc}>
                      {id + 1}. {item}
                    </p>
                  );
                })}

                <div>
                  <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                  >
                    <DialogTitle style={{ textAlign: "center" }}>
                      Write your review
                    </DialogTitle>
                    <DialogContent className={styles.submitDialog}>
                      <div>
                        <Rating
                          onChange={(e) => setRating(e.target.value)}
                          value={rating}
                          size="large"
                        />
                      </div>

                      <div>
                        <textarea
                          className={styles.submitDialogTextArea}
                          cols="50"
                          rows="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={submitReviewToggle} color="secondary">
                        Cancel
                      </Button>
                      <Button color="primary" onClick={reviewSubmitHandler}>
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <h3 style={{ marginTop: "20px" }}>Reviews</h3>
                  {data?.reviews && data?.reviews[0] ? (
                    <div className="reviews">
                      {data?.reviews &&
                        data?.reviews.map((review) => (
                          <ReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                  ) : (
                    <p style={{ marginTop: "10px" }}>No Reviews Yet</p>
                  )}
                  {user && (
                    <button
                      className={styles.submitReview}
                      onClick={submitReviewToggle}
                    >
                      Add a review
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.hotelDetailsPrice}>
                <h1>Perfect for your stay!</h1>
                <span>
                  {data?.nearest}, this property has an excellent location
                </span>
                <h2>
                  <b>${data?.price}</b> ({data?.rating} Star rating)
                </h2>

                <Link
                  href={{
                    pathname: "/inquiry/Hotel",
                    query: {
                      id: data?._id,
                      name: data?.name,
                    },
                  }}
                  className={styles.inquiryBtn}
                >
                  Inquire Hotel
                </Link>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <h3>Related Hotels</h3>

              <div className={styles.relatedWrapper}>
                {relatedItems?.map((item, id) => {
                  return <RelatedHotelItem key={id} data={item} />;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotel;
