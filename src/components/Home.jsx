"use client";

import React, { useEffect } from "react";
// import Image from "next/image";
import Background from "@/_assets/svgs/logo/HeroSectionImage.webp";
import mobileImage from "@/_assets/svgs/logo/BG.webp";
import { useDispatch, useSelector } from "react-redux";

import { fetchHomeCategories } from "@/lib/thunks/fetchHomeCategories";
import { fetchBanner } from "@/lib/thunks/fetchBanner";
import { fetchCategoriesAndItineraries } from "@/lib/thunks/fetchCategoriesAndItineraries ";
import { fetchHeroItineraries } from "@/lib/thunks/fetchHeroItineraries";
import { fetchGalleryImages } from "@/lib/thunks/fetchGalleryImages";

import AwardFooter from "./User/HomePage/HeroSection/AwardsFooter";
import FeaturedSection from "./User/HomePage/HeroSection/FeaturedSection";
import CategorySection from "./User/HomePage/categorySection/CategorySection";
import ItineraryPSection from "./User/HomePage/itenerarySection/IteneraySection";
import BannerSlider from "./User/HomePage/banners/BannerSlider";
import TripsPage from "./User/HomePage/tripSection/TripPage";
import JourneySection from "./User/HomePage/journeysection/JourneySection";
import Gallery from "./User/HomePage/galaryView/GalaryView";
import Testimonial from './User/HomePage/reviewSection/ReviewSection'
import Footer from "./User/Footer/Footer";
import { fetchTermAndCondition } from "@/lib/thunks/fetchTermAndCondition";


function Home() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.global.homeCategories) || [];

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchHomeCategories());
    }
    dispatch(fetchBanner());
    dispatch(fetchTermAndCondition());
    dispatch(fetchCategoriesAndItineraries());
    dispatch(fetchHeroItineraries());
    dispatch(fetchGalleryImages());
  }, [dispatch, categories.length]);

  return (
    <div className="w-full">
      {/* <Helmet>
        <title>Home - Safar Wanderlust</title>
        <meta
          name="description"
          content="Discover curated categories with Safar Wanderlust for adventures that inspire and connect. Group Trips, Winter Special Trips, and Customize Trips available."
        />
        <meta
          name="keywords"
          content="trips, kashmir, group trips, winter special trips, safar wanderlust"
        />
        <meta name="author" content="Safar Wanderlust" />
        <meta
          property="og:title"
          content="Safar Wanderlust - Explore the World with Us"
        />
        <meta
          property="og:description"
          content="Join Safar Wanderlust for unforgettable adventures. Explore categories and itineraries curated for an extraordinary experience."
        />
        <meta property="og:image" content={Background} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet> */}
      <div
        className="hidden flex-col items-center bg-cover bg-top bg-no-repeat pb-10 sm:bg-center md:flex md:bg-top"
        style={{
          backgroundImage: `url(${Background.src})`
        }}
      >
        <div className="mt-[45rem] max-w-screen sm:mt-[40rem] lg:mt-[45rem] xl:mt-[45rem]">
          <FeaturedSection />
        </div>
        <AwardFooter />
      </div>
      <div
        className="my-2 flex h-fit w-full flex-col items-center bg-cover bg-no-repeat md:hidden"
        style={{
          backgroundImage: `url(${mobileImage.src})`
        }}
      >
        <div className="mt-80 w-full">
          <FeaturedSection />
        </div>
      </div>
       <CategorySection />
       <ItineraryPSection />
       <BannerSlider />
       <TripsPage />
      <JourneySection />
      <Gallery />
     <Testimonial />
     <Footer />
    </div>
  );
}

export default Home;
