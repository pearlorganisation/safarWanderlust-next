import React, { useEffect } from 'react'
import SearchResultsHero from './SearchResultHero'
import SearchResultItenary from './SearchResultItenary'
import BannerSlider from '../HomePage/banners/BannerSlider'
import OtherItineraries from './OtherItineraries'
import WhySafarWandarLust from './WhySWL'
import Testimonial from '../HomePage/reviewSection/ReviewSection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBanner } from '../../../redux/thunks/fetchBanner'
import { fetchReviews } from '../../../redux/thunks/fetchReviews'

function SearchPage() {
  const dispatch = useDispatch()

  const SearchResults =
    useSelector((state) => state.global.search_results) || []
  const banner = useSelector((state) => state.global.banners) || []
  const reviews = useSelector((state) => state.global.reviews) || []

  useEffect(() => {
    if (banner.length === 0) {
      dispatch(fetchBanner())
    }
    if (reviews.length === 0) {
      dispatch(fetchReviews())
    }
  }, [banner.length, reviews.length, dispatch]) // Add relevant dependencies

  return (
    <div>
      <SearchResultsHero />
      <SearchResultItenary SearchResults={SearchResults} />
      <BannerSlider />
      <OtherItineraries />
      <WhySafarWandarLust />
      <Testimonial />
    </div>
  )
}

export default SearchPage
