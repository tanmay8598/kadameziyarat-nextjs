"use client";
import React, { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { DateRange } from "react-date-range";
import styles from "./page.module.css";
import SearchItem from "@/components/SearchItem/SearchItem";
import apiClient from "@/api/client";

const List = () => {
  const [destination, setDestination] = useState();
  const [date, setDate] = useState();
  const [openDate, setOpenDate] = useState();
  const [options, setOptions] = useState();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [packages, setPackages] = useState([]);

  const fetchPackages = async () => {
    const { data } = await apiClient.get("/package/");
    setPackages(data?.products);
  };

  useEffect(() => {
    fetchPackages();
  }, []);
  return (
    <div>
      <div className={styles.listContainer}>
        <div className={styles.listWrapper}>
          {/* <div className={styles.listSearch}>
            <h1 className={styles.lsTitle}>Search</h1>
            <div className={styles.lsItem}>
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className={styles.lsItem}>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                state[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(state[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className={styles.lsItem}>
              <label>Options</label>
              <div className={styles.lsOptions}>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>Adult</span>
                  <input
                    type="number"
                    min={1}
                    className={styles.lsOptionInput}
                    placeholder={options?.adult}
                  />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>Children</span>
                  <input
                    type="number"
                    min={0}
                    className={styles.lsOptionInput}
                    placeholder={options?.children}
                  />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>Room</span>
                  <input
                    type="number"
                    min={1}
                    className={styles.lsOptionInput}
                    placeholder={options?.room}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div> */}
          <div className={styles.listResult}>
            {packages?.map((item, id) => {
              return <SearchItem item={item} key={id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
