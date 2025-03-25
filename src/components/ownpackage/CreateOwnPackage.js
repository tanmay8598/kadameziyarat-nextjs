"use client";
import React, { useState } from "react";
import styles from "./ownpackage.module.css";
import Select from "react-select";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const CreateOwnPackage = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className={styles.container}>
      <Select
        options={options}
        className={styles.hotelcontainer}
        placeholder="Select/Search Hotel"
      />

      <DatePicker onChange={onChange} value={value} />
      <input
        className={styles.peoplecontainer}
        placeholder="Guests"
        type="number"
      />
      <div className={styles.buttoncontainer}>
        <button className={styles.createbutton}>Create</button>
      </div>
    </div>
  );
};

export default CreateOwnPackage;
