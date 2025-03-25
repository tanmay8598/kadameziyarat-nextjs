"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import apiClient from "@/api/client";
import styles from "./page.module.css";
import SearchItem from "@/components/SearchItem/SearchItem";

const Search = () => {
  const searchParams = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const days = searchParams.get("numberOfDays");
  const Query = searchParams.get("destination");

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const { data } = await apiClient.get("/package/search", {
      days: days,
      Query: Query,
    });

    if (data.length < 1) {
      setLoading(false);
      swal("No Packages Found!");
    } else {
      //route to next page
      setPackages(data);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>
        {Query}: {packages?.length} packages found
      </h2>
      <div style={{ marginTop: "30px" }}>
        {packages?.map((item, id) => {
          return <SearchItem item={item} key={id} />;
        })}
      </div>{" "}
    </div>
  );
};

export default Search;
