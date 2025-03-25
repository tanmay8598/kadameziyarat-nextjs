import React from "react";
import styles from "./footer.module.css";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "@/auth/useAuth";
import Link from "next/link";

const data = [
  {
    id: "1",
    textDescription: "Visa and Accommodation",
  },
  {
    id: "2",
    textDescription: "Seamless Logistics: Hassle-free travel arrangements",
  },
  {
    id: "3",
    textDescription: "Cultural Immersion",
  },
  {
    id: "4",
    textDescription: "Expert Guidance: Knowledgeable guides",
  },
];

const Footer = () => {
  const { user } = useAuth();
  return (
    <>
      <div className={styles.bannerContainer}>
        {data?.map((item, id) => {
          return (
            <div className={styles.banner} key={id}>
              <p style={{ width: "90%" }}>{item.textDescription}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2>Kadam-E-Ziyarat</h2>
          <p>
            Welcome to your trusted partner Kakdamezirat in the spiritual journey for the most sacred sites in the Muslim world. Inspired by the intensive act of "Ziarat" (to go to holy sites), we are dedicated to facilitating transformative pilgrims for Iran, Iraq and Najaf, where history, faith and spirituality are convergence.
          </p>
          <div className={styles.socialContainer}>
            <a
              className={styles.socialIcon}
              href="https://www.facebook.com/share/1C5PMu3c5z/"
              target="_blank"
            >
              <img src="./1.png" alt="" />
            </a>
            <a
              className={styles.socialIcon}
              href="https://www.instagram.com/kadam_e_ziyarat?igsh=emRibTB2NjZqMDZq"
              target="_blank"
            >
              <img src="./2.png" alt="" />
            </a>

            {/* <a className={styles.socialIcon}>
              <img src="./4.png" alt="" />
            </a> */}
          </div>
          <p style={{ fontSize: "12px" }}>
            Powered by{" "}
            <a href="https://ixtminds.com/" style={{ fontWeight: '800', letterSpacing: '1px' }}>IXT Minds</a>
          </p>
        </div>
        <div className={styles.center}>
          <h3>Useful Links</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
                Home
              </a>
            </li>
            <li className={styles.listItem}>
              <Link
                href="/user"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                My Account
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link
                href="/upcoming"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Tickets
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link
                href="/blog"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Blogs
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link
                href="/about"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                About Us
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link
                href="/contact"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <h3>Contact</h3>
          <div className={styles.contactItem}>
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ marginRight: "10px" }}
            />
            Lucknow, India
          </div>
          {/* <div className={styles.contactItem}>
            {" "}
            <FontAwesomeIcon icon={faPhone} style={{ marginRight: "10px" }} />
            +974-66178767
          </div> */}
          <div className={styles.contactItem}>
            {" "}
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ marginRight: "10px" }}
            />
            info@kadameziyarat.com
          </div>
          <img
            src="https://i.ibb.co/Qfvn4z6/payment.png"
            alt=""
            className={styles.payment}
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
