"use client";
import { useEffect, useState } from "react";
import apiClient from "@/api/client";
import Banner from "@/components/banner/Banner";
import styles from "./page.module.css";
import FeaturedPackages from "@/components/FeaturedPackages/FeaturedPackages";
import FeaturedHotels from "@/components/FeaturedHotels/FeaturedHotels";
import PropertyByArea from "@/components/propertyByArea/PropertyByArea";
import Header from "@/components/header/Header";

import ReviewSlider from "@/components/reviewSlider/ReviewSlider";
import useAuth from "@/auth/useAuth";
import Testimonials from "@/components/testimonials/Testimonials";

export default function Home() {
  const { user, logIn } = useAuth();
  const [packages, setPackages] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchPackages = async () => {
    const { data } = await apiClient.get("/featured/featured-package-all");

    setPackages(data);
  };
  const fetchHotels = async () => {
    const { data } = await apiClient.get("/featured/featured-hotel-all");
    setHotels(data);
  };

  const fetchHotelCategories = async () => {
    const { data } = await apiClient.get("/variation/get-hotel-categories");
    setCategories(data);
  };
  const fetchBanners = async () => {
    const { data } = await apiClient.get("/banner/all");

    setBanners(data);
  };
  const fetchReviews = async () => {
    const { data } = await apiClient.get("/review/get");
    setReviews(data);
  };

  useEffect(() => {
    fetchPackages();
    fetchHotels();
    fetchHotelCategories();
    fetchBanners();
    fetchReviews();
  }, []);

  return (
    <>
      <div>
        <Header />

        <Banner images={banners} />
        <div className={styles.container2}>
          <PropertyByArea categories={categories} />
          <FeaturedPackages packages={packages} />
          <FeaturedHotels hotels={hotels} />
          <ReviewSlider />
          <Testimonials />
        </div>
      </div>
    </>
  );
}
