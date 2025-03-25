import React from "react";
import styles from "./page.module.css";

export const metadata = {
  title: "About Kadameziyarat - Your Trusted Partner for Spiritual Journeys",
  description:
    "Discover Kadameziyarat, your trusted companion in spiritual travel. We specialize in organizing meaningful and comfortable Ziyarat tours to sacred sites in Iran, Iraq, and Najaf, ensuring a seamless and enriching pilgrimage experience.",
};

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>About Kadameziyarat</h1>
          <p className={styles.imgSubtitle}>
            Your Trusted Companion in Spiritual Journeys
          </p>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Who We Are</h1>
          <p className={styles.desc}>
            Welcome to Kadameziyarat, your trusted partner in embarking on
            spiritually enriching journeys to the most sacred sites in the
            Muslim world. Rooted in the deep significance of "Ziarat"—the act
            of visiting holy places—we are dedicated to organizing meaningful,
            comfortable, and seamless pilgrimages to Iran, Iraq, and Najaf.
          </p>
        </div>

        <div className={styles.item}>
          <h1 className={styles.title}>Our Mission</h1>
          <p className={styles.desc}>
            At Kadameziyarat, our mission is to provide authentic and
            spiritually fulfilling travel experiences. We understand the deep
            significance of visiting the sacred shrines of Ahlul Bayt (AS) and
            other holy sites, and we strive to make these journeys accessible,
            safe, and transformative for every traveler.
          </p>
        </div>

        <div className={styles.item}>
          <h1 className={styles.title}>Why Choose Kadameziyarat?</h1>
          <ul className={styles.list}>
            <li>
              <strong>Expertise in Ziyarat Tours:</strong> With years of
              experience, we specialize in comprehensive pilgrimage packages
              for Iran, Iraq, and Najaf, taking care of every detail.
            </li>
            <li>
              <strong>Customized Pilgrimage Programs:</strong> Whether you
              visit the shrine of Imam Hussain (AS) in Karbala, Imam Ali (AS) in
              Najaf, or Imam Reza (AS) in Mashhad, we tailor your journey to
              meet your spiritual and personal needs.
            </li>
            <li>
              <strong>Comprehensive Ground Services:</strong> From
              transportation and accommodation to guided tours and visa
              assistance, we handle logistics so you can focus on your
              pilgrimage.
            </li>
            <li>
              <strong>Local Knowledge & Safety:</strong> Our team has deep
              connections and knowledge of the regions, ensuring an authentic,
              safe, and insightful travel experience.
            </li>
            <li>
              <strong>Trust & Care:</strong> We prioritize transparency,
              reliability, and the well-being of our pilgrims, considering each
              journey as a sacred responsibility.
            </li>
          </ul>
        </div>

        <div className={styles.item}>
          <h1 className={styles.title}>Our Services</h1>
          <ul className={styles.list}>
            <li>
              <strong>Ziyarat Packages for Iraq:</strong> Visit Najaf, Karbala,
              Samarra, and Kazimayn to pay homage at the sacred shrines.
            </li>
            <li>
              <strong>Ziyarat Packages for Iran:</strong> Explore holy sites in
              Mashhad, Qom, and Shiraz, including the shrine of Imam Reza (AS)
              and Lady Fatima Masuma (AS).
            </li>
            <li>
              <strong>Guided Tours:</strong> Our knowledgeable guides provide
              historical and spiritual insights, deepening your connection with
              Ahlul Bayt (AS) and Islamic heritage.
            </li>
            <li>
              <strong>Group & Private Packages:</strong> Flexible travel
              options for families, groups, and individual travelers.
            </li>
            <li>
              <strong>Comfortable Accommodation & Transport:</strong> We
              ensure high-quality stays and reliable transportation throughout
              your journey.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;