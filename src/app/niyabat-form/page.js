"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import swal from "sweetalert";
import { redirect, useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";

const NiyabatPage = () => {
  const { user } = useAuth();

  if (!user) {
    // swal("Login", "for Niyabat form");
    redirect("/login");
  }
  const router = useRouter();
  const [value, setValue] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const fatherName = e.target[1].value;
    const email = e.target[2].value;
    // const mobile = e.target[3].value;
    const zayarName = e.target[4].value;
    const message = e.target[5].value;

    const result = await apiClient.post("/nibayat/create", {
      name,
      user: user.id,
      zayarName,
      fatherName,
      mobile: value,
      email,
      message,
    });
    if (result.ok) {
      swal("Enquiry Submitted");
      router.push("/");
    } else {
      console.log("error");
    }
  };

  return (
    <div className={styles.container1}>
      <div className={styles.imgContainer}>
        <img src="/niyabat2.jpg" fill={true} alt="" className={styles.img} />
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>Niyabati Ziyarat</h1>
          {/* <h2 className={styles.imgDesc}></h2> */}
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <p className={styles.desc}>
            The etymological meaning of the term Niyabati- ziarat is a holy
            expedition of visiting religious leaders or their graves/Rauza
            performed under legateship by a legate or representative.Usually
            done on behalf of a deceased person/ Marhumeen with due
            consideration of all the sharait and obligatory instruction of
            performing ziarat.
          </p>
        </div>
        <div className={styles.item}>
          <p className={styles.desc}>
            To put in a request for Niyabati-ziarat, fill the details in the
            form enclosed on the website. Also, we will keep you posted with the
            updates on the ziarat through pictures and videos via
            WhatsApp/email.
            <br /> <br />
            Khuddam-e-zayar conducts the Niyabati-ziarat as an act of generosity
            towards our community, characterising it as philanthropic work.
          </p>
          {/* <Button url="/contact" text="Contact" /> */}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.contactbox}>
          <div className={styles.left}></div>
          <form className={styles.right} onSubmit={handleSubmit}>
            <h2 className={styles.heading}>Form</h2>
            <input
              type="text"
              className={styles.field}
              placeholder=" Name"
              required
            />
            <input
              type="text"
              className={styles.field}
              placeholder=" Father's Name"
              required
            />
            <input
              type="email"
              className={styles.field}
              placeholder=" Email"
              required
            />
            <div className={styles.field}>
              <PhoneInput
                country={"us"}
                value={value}
                onChange={setValue}
                inputStyle={{ border: "none" }}
                dropdownStyle={{ padding: "0" }}
              />
            </div>
            <input
              type="text"
              className={styles.field}
              placeholder=" Pilgrim's Name"
              required
            />

            <textarea
              placeholder="Message"
              className={styles.field}
              style={{ minHeight: "150px", marginTop: "20px" }}
              required
            ></textarea>
            <button className={styles.btn}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NiyabatPage;
