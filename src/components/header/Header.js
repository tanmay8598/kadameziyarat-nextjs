import React, { useCallback } from "react";
import {
  faBed,
  faBlog,
  faBookAtlas,
  faCalendarDays,
  faCar,
  faClose,
  faHotel,
  faLuggageCart,
  faMoon,
  faPassport,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import Link from "next/link";
import useAuth from "@/auth/useAuth";
import "react-dropdown/style.css";
import moment from "moment";

const Header = ({ type }) => {

  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const { user } = useAuth();

  const [countries, setCountries] = useState([
    { name: "UAE" },
    { name: "Qatar" },
    { name: "Turkey" },
    { name: "Saudi Arabia" },
    { name: "Iraq" },
    { name: "Iran" },
  ]);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  var timeDiff = Math.abs(
    new Date(date[0].startDate).getTime() - new Date(date[0].endDate).getTime()
  );

  var numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerList}>
          <Link
            className={`${styles.headerListItem} ${styles.active}`}
            href="/packages"
          >
            <FontAwesomeIcon icon={faLuggageCart} />
            <span>Packages</span>
          </Link>
          <Link className={styles.headerListItem} href="/hotels">
            <FontAwesomeIcon icon={faHotel} />
            <span>Hotels</span>
          </Link>

          <Link className={styles.headerListItem} href="/blog">
            <FontAwesomeIcon icon={faBookAtlas} />
            <span>Blogs</span>
          </Link>{" "}
          <Link className={styles.headerListItem} href="/inquiry/Visa">
            <FontAwesomeIcon icon={faPassport} />
            <span>Visa</span>
          </Link>
          <Link className={styles.headerListItem} href="/upcoming">
            <FontAwesomeIcon icon={faPlane} />
            <span>Tickets</span>
          </Link>
          <Link
            className={`${styles.headerListItem} ${styles.lastItem}`}
            href="/upcoming"
          >
            <FontAwesomeIcon icon={faTaxi} />
            <span>Taxis</span>
          </Link>
        </div>
        {type !== "list" && (
          <div className={styles.headerContentWrapper}>
            <div className={styles.headerContentWrapper1}>
              <h1 className={styles.headerTitle}>
                Journey to the Heart of Faith – Where Every Step is a Blessing
              </h1>
              <p className={styles.headerDesc}>
                Your trusted partner Kadamezirat in the spiritual journey for the most sacred sites in the Muslim world
              </p>

              {!user && (
                <Link
                  className={`${styles.headerBtn} ${styles.headerBtn1}`}
                  href="/login"
                >
                  Join Now
                </Link>
              )}
            </div>

            <div className={styles.headerSearch}>
              <div>
                <div className={styles.headerSearchItem} onClick={toggleOpen}>
                  <FontAwesomeIcon icon={faBed} className={styles.headerIcon} />
                  <input
                    type="text"
                    placeholder="Destination? UAE, Qatar etc."
                    className={styles.headerSearchInput}
                    onChange={(e) => setDestination(e.target.value)}
                    value={destination}
                  />
                  ;
                </div>
                {isOpen && (
                  <div className={styles.menuItemContainer}>
                    {countries?.map((item, id) => {
                      return (
                        <div
                          key={id}
                          className={styles.menuItem}
                          onClick={() => {
                            setDestination(item.name);
                            setIsOpen(false);
                          }}
                        >
                          <p>{item.name}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className={styles.divider}></div>
              <div className={styles.headerSearchItem}>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className={styles.headerIcon}
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className={styles.headerSearchText}
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {
                      // setDate([item.selection]);
                      if (
                        moment(item.selection.startDate).format(
                          "MM-DD-YYYY"
                        ) !==
                        moment(item.selection.endDate).format("MM-DD-YYYY")
                      ) {
                        setOpenDate(false);
                      } else if (
                        item.selection.startDate === "" &&
                        item.selection.endDate === ""
                      ) {
                        setOpenDate(false);
                      }
                      setDate([item.selection]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className={styles.date}
                    minDate={new Date()}
                  />
                )}
                {openDate && (
                  <FontAwesomeIcon
                    icon={faClose}
                    color="black"
                    onClick={() => setOpenDate(false)}
                    className={styles.closeBtn}
                  />
                )}
              </div>{" "}
              <div className={styles.divider}></div>
              <div
                className={`${styles.headerSearchItem} ${styles.headerSearchItemBtn} ${styles.headerSearchItemMobile}`}
              >
                <Link
                  className={styles.headerBtn}
                  href={{
                    pathname: "/search",
                    query: {
                      numberOfDays: numberOfDays,
                      destination: destination,
                    },
                  }}
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
