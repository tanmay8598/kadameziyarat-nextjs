"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import { redirect, useRouter } from "next/navigation";
import BookingItem from "@/components/myBookingItem/BookingItem";

const Mybookings = () => {
  const { user } = useAuth();

  if (!user) {
    redirect("/");
  }

  const router = useRouter();

  const [data, setData] = useState();

  const fetchBookings = async () => {
    const { data } = await apiClient.get("/booking/mybookings", {
      userId: user?.id,
    });

    setData(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className={styles.container}>
      <h2>My bookings</h2>

      <ul className={styles.bookingsContainer}>
        {data?.map((booking, id) => {
          return <BookingItem item={booking} key={id} />;
        })}
      </ul>
      {data?.length < 1 && (
        <h1 className={styles.errNotfound}>No bookings found</h1>
      )}
    </div>
  );
};

export default Mybookings;
