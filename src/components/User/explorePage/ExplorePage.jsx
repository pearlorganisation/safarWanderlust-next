"use client"

import React, { useEffect } from 'react'
import ExploreTrekking from './ExploreTrekking'
import ExplorePageResult from './ExplorePageResult'
import BannerSlider from '../HomePage/banners/BannerSlider'
import OtherItineraries from '../searchPage/OtherItineraries'
import Stats from './StatsSection'
import WhySafarWandarLust from '../searchPage/WhySWL'
import PartnersSection from './PartnersSection'
import Testimonial from '../HomePage/reviewSection/ReviewSection'
import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
import { useParams } from "next/navigation";
import { fetchCategoriesByName } from '@/lib/thunks/fetchCategoriesByName'
import { fetchTrendingItineraries } from '@/lib/thunks/fetchTrendingItineraries'

function ExplorePage() {
      const category = useSelector((state) => state.global.CategoryByID) || []
      const dispatch = useDispatch();
      //  const { id } = useParams()
      const params = useParams();
      const { id } = params; 

            useEffect(() => {
              dispatch(fetchCategoriesByName(id));
              dispatch(fetchTrendingItineraries());
            }, []);

            
            
  return (
    <div>
      <ExploreTrekking
        title={category.name}
        description={category.description}
        keyPoints={category.keyPoints}
      />
      <ExplorePageResult itineraries={category.itinerary} />
      <BannerSlider />
      <OtherItineraries />
      <BannerSlider />
      <Stats />
      <WhySafarWandarLust />
      <PartnersSection />
      <Testimonial />
    </div>
  )
}

export default ExplorePage