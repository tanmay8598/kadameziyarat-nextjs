import React from "react";
import styles from "./contact.module.css";

export const metadata = {
  title: "Khuddam e zair Enquiry Form",
  description: "This is a Enquiry Page",
};

const ContactForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contactbox}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <h2 className={styles.heading}>Enquiry Form</h2>
          <input type="text" className={styles.field} placeholder="Your Name" />
          <input
            type="text"
            className={styles.field}
            placeholder="Your Email"
          />
          <input
            type="text"
            className={styles.field}
            placeholder="Your Phone"
          />

          <textarea
            placeholder="Message"
            className={styles.field}
            style={{ minHeight: "150px", marginTop: "20px" }}
          ></textarea>
          <button className={styles.btn}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
