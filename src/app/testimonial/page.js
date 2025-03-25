"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

const TestimonialForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = e.target[0].value;
    const result = await apiClient.post("/test/create", {
      user,
      desc: message,
      name: user?.name,
    });
    if (result.ok) {
      swal("Testimonial Submitted Thanks!");
      router.push("/");
    } else {
      console.log("error");
    }
  };

  //   if (!user) {
  //     redirect("/login");
  //   }

  return (
    <div className={styles.container}>
      <div className={styles.contactbox}>
        <div className={styles.left}></div>
        <form className={styles.right} onSubmit={handleSubmit}>
          <h2 className={styles.heading}>Testimonial Form</h2>

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
  );
};

export default TestimonialForm;
