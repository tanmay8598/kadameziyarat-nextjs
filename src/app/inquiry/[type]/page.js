"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import swal from "sweetalert";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCross } from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import moment from "moment";

const ContactForm = ({ params }) => {
  const { user } = useAuth();
  const searchParams = useSearchParams();

  const [value, setValue] = useState();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  var options = { month: "long", day: "numeric", year: "numeric" };

  const arrivalDate = new Date(date[0]?.startDate).toLocaleDateString(
    "en-US",
    options
  );
  const departureDate = new Date(date[0]?.endDate).toLocaleDateString(
    "en-US",
    options
  );

  const router = useRouter();
  const category = params.type.split("-")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;

    const message =
      e.target[3].value + " from: " + arrivalDate + " to: " + departureDate;

    if (category == "hotel") {
      const result = await apiClient.post("/enquiry/create", {
        name,
        user: user.id,
        category,
        mobile: value,
        email,
        message,
        hotel: id,
      });
      if (result.ok) {
        swal("Enquiry Submitted");
        router.push("/");
      } else {
        console.log("error");
      }
    } else if (category == "package") {
      const result = await apiClient.post("/enquiry/create", {
        name,
        user: user.id,
        category,
        mobile: value,
        email,
        message,
        package: id,
      });
      if (result.ok) {
        swal("Enquiry Submitted");
        router.push("/");
      } else {
        console.log("error");
      }
    } else {
      const result = await apiClient.post("/enquiry/create", {
        name,
        user: user.id,
        category,
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
    }
  };

  if (!user) {
    redirect("/login");
  }

  return (
    <div className={styles.container}>
      <div className={styles.contactbox}>
        <div className={styles.left}></div>
        <form className={styles.right} onSubmit={handleSubmit}>
          <h2 className={styles.heading}>
            {name} {category === "Visa" ? "Visa" : ""}
          </h2>
          <h2 className={styles.heading}>Inquiry Form</h2>
          <input
            type="text"
            className={styles.field}
            placeholder=" Name"
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

          <div className={styles.dateWrapper}>
            <span
              onClick={() => setOpenDate(!openDate)}
              className={`${styles.field} ${styles.field2}`}
            >
              {" "}
              <p>Select Date</p>{" "}
              {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}
            </span>
          </div>

          {openDate && (
            <div>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  if (
                    moment(item.selection.startDate).format("MM-DD-YYYY") !==
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
              <FontAwesomeIcon
                icon={faClose}
                color="white"
                onClick={() => {
                  setOpenDate(false);
                }}
                style={{
                  marginLeft: "20px",
                  backgroundColor: "black",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              />
            </div>
          )}
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

export default ContactForm;
