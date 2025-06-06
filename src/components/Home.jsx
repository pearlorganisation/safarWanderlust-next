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

import { fetchTermAndCondition } from "@/lib/thunks/fetchTermAndCondition";
import Head from "next/head";
import PartnersSection from "./User/explorePage/PartnersSection";


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
       <h1 className="hidden">Safar Wanderlust</h1>
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
     <PartnersSection />
    </div>
  );
}

export default Home;
