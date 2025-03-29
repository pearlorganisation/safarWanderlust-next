import React, { useEffect } from 'react'


import { useDispatch, useSelector } from 'react-redux'
// import { fetchCategoriesById } from '../../../redux/thunks/fetchCategoriesById'
import { fetchTrendingItineraries } from '../../../redux/thunks/fetchTrendingItineraries'
import { useParams } from 'react-router-dom'
import TrendingSection from './TrendingSection'
import ExplorePageResult from '../explorePage/ExplorePageResult'
import BannerSlider from '../HomePage/banners/BannerSlider'
import { fetchBanner } from '../../../redux/thunks/fetchBanner'
import OtherItineraries from '../searchPage/OtherItineraries'
import Stats from '../explorePage/StatsSection'
import WhySafarWandarLust from '../searchPage/WhySWL'
import PartnersSection from '../explorePage/PartnersSection'
import Testimonial from '../HomePage/reviewSection/ReviewSection'

function TrendingPage() {
  const category = useSelector((state) => state.global.CategoryByID) || []
  const itinerraries=useSelector((state) => state.global.trendingItineraries)||[]
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    // dispatch(fetchCategoriesById(id))
    dispatch(fetchTrendingItineraries())
    dispatch(fetchBanner())
  }, [])

  return (
    <div>
      <TrendingSection
        title={category.name}
        description={category.description}
        keyPoints={category.keyPoints}
      />
      <ExplorePageResult itineraries={itinerraries} />
      <BannerSlider />
      <Stats />
      <WhySafarWandarLust />
      <PartnersSection />
      <Testimonial />
    </div>
  )
}

export default TrendingPage
