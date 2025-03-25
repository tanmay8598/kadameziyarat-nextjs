import React from "react";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact Kadameziyarat - Get in Touch for Your Ziyarat Journey",
  description:
    "Have questions or need assistance with your Ziyarat pilgrimage? Contact Kadameziyarat for expert guidance on travel packages, accommodations, and spiritual tours to sacred sites in Iran, Iraq, and Najaf. We're here to help!",
};

const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>Contact Kadameziyarat</h1>
          <p className={styles.imgSubtitle}>We're here to assist you</p>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.desc}>
            Whether you have inquiries about our Ziyarat packages or need
            assistance planning your spiritual journey, our team is here to
            help. Feel free to reach out to us.
          </p>
        </div>

        <div className={styles.item}>
          <h1 className={styles.title}>Contact Information</h1>
          <p className={styles.contactInfo}>
            <strong>Email:</strong> info@kadameziyarat.com
          </p>
          <p className={styles.contactInfo}>
            <strong>Office:</strong> Lucknow, India
          </p>
          {/* Uncomment if needed */}
          {/* <p className={styles.contactInfo}>
            <strong>Mobile:</strong> +974-66178767
          </p> */}
        </div>

        <div className={styles.item}>
          <h1 className={styles.title}>Send Us a Message</h1>
          <form className={styles.form}>
            <input type="text" placeholder="Your Name" className={styles.input} />
            <input type="email" placeholder="Your Email" className={styles.input} />
            <textarea
              placeholder="Your Message"
              className={styles.textarea}
            ></textarea>
            <button type="submit" className={styles.button}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
