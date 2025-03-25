"use client";
import apiClient from "@/api/client";
import React, { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faPlus,
  faMinus,
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faLocationPin,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { useDispatch } from "react-redux";
import { add } from "@/redux/cartSlice";
import useAuth from "@/auth/useAuth";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

import Rating from "@mui/material/Rating";
import swal from "sweetalert";
import ReviewCard from "@/components/review/ReviewCard";
import { PuffLoader } from "react-spinners";
import RelatedItem from "@/components/realtedItem/RelatedItem";
import { Rating as Rating2 } from "react-simple-star-rating";
import Banner from "@/components/banner/Banner";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";

const PackageDetailPage = ({ params }) => {
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [persons, setPersons] = useState(0);
  const [relatedItems, setRelatedItems] = useState([]);

  const np = (data?.price - (data?.discount / 100) * data?.price).toFixed(0);

  const [openOptions, setOpenOptions] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    infant: 0,
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  //product review comment
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  //image
  const [slideNumber, setSlideNumber] = useState(0);
  const [open2, setOpen2] = useState(false);

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const { user } = useAuth();

  const router = useRouter();

  const dispatch = useDispatch();

  const [state, setState] = useState([]);

  var options1 = { month: "long", day: "numeric" };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const result = await apiClient.get("/package/get-package-by-id", {
        productId: params.slug,
      });

      if (!result.ok) {
        return;
      }

      setData(result.data);

      setState([
        {
          startDate: new Date(),
          // endDate: addDays(new Date(), 2),
          endDate: addDays(new Date(), result.data.days),
          key: "selection",
        },
      ]);
      setIsLoading(false);
    };
    getData();
    fetchRelatedItems();
  }, []);

  const fetchRelatedItems = async () => {
    const { data } = await apiClient.get("/package/");

    setRelatedItems(data.products.slice(0, 4));
  };

  const reviewSubmitHandler = async () => {
    const result = await apiClient.post("/package/create-review", {
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

  const handleSubmit = () => {
    dispatch(
      add({
        product: data,
        persons: options,
        arrivalDate: state[0].startDate,
        departureDate: state[0].endDate,
      })
    );
    router.push("/cart");
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

  return (
    <div className={styles.packageContainer}>
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
            <img src={data?.image[slideNumber]} alt="" className="sliderImg" />
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
        <div>
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
          <div className={styles.container}>
            <div className={styles.left}>
              <div className={styles.leftWrapper}>
                <div>
                  <div className={styles.headingContainer}>
                    <h2>{data?.name}</h2>
                  </div>
                  <div className={styles.headingContainer}>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className={styles.locationMarker}
                      color="#0071c2"
                    />
                    <p>{data?.hotel}</p>
                  </div>
                </div>
                {/* <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={data?.rating}
                /> */}
                <Rating2 value={data?.rating} size={15} readonly={true} />
                <div className={styles.mobileRatingWrapper}>
                  <div className={styles.siRating}>
                    <button>{data?.rating}</button>
                    <span>Excellent</span>
                    <p>({data?.reviews?.length} Ratings)</p>
                  </div>
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
                </div>
              </div>
              <button
                onClick={() => router.push(`/inquiry/package-${data?._id}`)}
                className={`${styles.bookNow} ${styles.mobilebookNow}`}
              >
                Inquire Package
              </button>
              <div className={styles.itenaryContainer}>
                <h3>Package Description</h3>
                <p>{data?.description}</p>
              </div>

              <div className={styles.itenaryContainer}>
                <h3>Most popular facilities</h3>
                {data?.details?.map((item, id) => {
                  return (
                    <p key={id}>
                      {id + 1}. {item}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.pricesection}>
                <div className={styles.priceTop}>
                  {data?.discount > 0 && (
                    <p className={styles.slashedPrice}>$ {data?.price}</p>
                  )}

                  <p className={styles.font12}>
                    <span className={styles.font24}>
                      <span>$ {np}</span>
                    </span>{" "}
                    per person*
                  </p>
                  {data?.discount > 0 && (
                    <span className={styles.pakageOfftag}>
                      {data?.discount}% OFF
                    </span>
                  )}
                </div>
                {/* <div className={styles.priceBottom}>
                  <div className={styles.row}>
                    <FontAwesomeIcon icon={faCalendar} />
                    <div className={styles.row2}>
                      <span style={{ fontWeight: "600" }}>
                        {state[0]?.startDate.toLocaleDateString(
                          "en-US",
                          options1
                        )}{" "}
                        -{" "}
                        {state[0]?.endDate.toLocaleDateString(
                          "en-US",
                          options1
                        )}
                      </span>
                      <span
                        className={styles.modifyBtn}
                        onClick={() => setModal(!modal)}
                      >
                        {modal ? "Close" : "Modify"}
                      </span>
                    </div>
                  </div>
                </div> */}
                {/* <div className={styles.desktopCalender}>
                  {modal && (
                    <DateRangePicker
                      onChange={(item) => setState([item.selection])}
                      showSelectionPreview={true}
                      months={1}
                      ranges={state}
                      direction="horizontal"
                      moveRangeOnFirstSelection={true}
                      minDate={new Date()}
                      focusedRange={[0, 0]}
                    />
                  )}
                </div> */}
                {/* <div className={styles.mobileCalender}>
                  {modal && (
                    <DateRangePicker
                      onChange={(item) => setState([item.selection])}
                      showSelectionPreview={true}
                      months={1}
                      ranges={state}
                      direction="vertical"
                      moveRangeOnFirstSelection={true}
                      minDate={new Date()}
                      focusedRange={[0, 0]}
                    />
                  )}
                </div> */}
                {/* <div className={styles.personsContainer}>
                  <p>Adults</p>
                  <div className={styles.counterWrapper}>
                    <FontAwesomeIcon
                      icon={faMinus}
                      onClick={() => {
                        if (persons <= 0) {
                          setPersons(0);
                        } else {
                          setPersons(persons - 1);
                        }
                      }}
                    />

                    <span>{persons}</span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      onClick={() => setPersons(persons + 1)}
                    />
                  </div>
                </div> */}
                {/* <div className={styles.headerSearchItem}>
                  <FontAwesomeIcon
                    icon={faPerson}
                    className={styles.headerIcon}
                  />
                  <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className={styles.headerSearchText}
                  >{`${options.adult} adult · ${options.children} children · ${options.infant} infant`}</span>
                  {openOptions && (
                    <div className={styles.options}>
                      <div className={styles.optionItem}>
                        <span className={styles.optionText}>
                          Adult(${data.price})
                        </span>
                        <div className={styles.optionCounter}>
                          <button
                            disabled={options.adult <= 1}
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("adult", "d")}
                          >
                            -
                          </button>
                          <span className={styles.optionCounterNumber}>
                            {options.adult}
                          </span>
                          <button
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className={styles.optionItem}>
                        <span className={styles.optionText}>
                          Children(${data.priceChild})
                        </span>
                        <div className={styles.optionCounter}>
                          <button
                            disabled={options.children <= 0}
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("children", "d")}
                          >
                            -
                          </button>
                          <span className={styles.optionCounterNumber}>
                            {options.children}
                          </span>
                          <button
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className={styles.optionItem}>
                        <span className={styles.optionText}>
                          Infant(${data.priceInfant})
                        </span>
                        <div className={styles.optionCounter}>
                          <button
                            disabled={options.infant <= 0}
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("infant", "d")}
                          >
                            -
                          </button>
                          <span className={styles.optionCounterNumber}>
                            {options.infant}
                          </span>
                          <button
                            className={styles.optionCounterButton}
                            onClick={() => handleOption("infant", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {openOptions && (
                    <span
                      className={styles.modifyBtn}
                      onClick={() => setOpenOptions(!openOptions)}
                    >
                      Close
                    </span>
                  )}
                </div> */}
                {/* <button onClick={handleSubmit} className={styles.bookNow}>
                  Book Now
                </button> */}
                <button
                  className={`${styles.bookNow} ${styles.desktopbookNow}`}
                >
                  <Link
                    href={{
                      pathname: "/inquiry/Package",
                      query: {
                        id: data?._id,
                        name: data?.name,
                      },
                    }}
                  >
                    Inquire Package
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              marginTop: "20px",
              borderRadius: "4px",
            }}
          >
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
              <p>No Reviews Yet</p>
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
          <div style={{ marginTop: "20px" }}>
            <h3>Related Packages</h3>

            <div className={styles.relatedWrapper}>
              {relatedItems?.map((item, id) => {
                return <RelatedItem key={id} data={item} />;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetailPage;
