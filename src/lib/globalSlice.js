import { createSlice } from '@reduxjs/toolkit'
import { setTextRange } from 'typescript'

const initialState = {
  to_show_loader: false,
  to_show_alert: false,
  alert_type: 'success',
  alert_content: '',
  to_show_dialog: false,
  categories: [], // Add categories to state
  itineraries: [], // Add itineraries to state
  homeCategories: [],
  banners: [],
  featuredCategory: [],
  HeroItineraries: [],
  GalleryImages: [],
  CategoryByID: [],
  trendingItineraries: [],
  itenerayByID: [],
  BookingPeopleDetails: [],
  NavBarCategories: [],
  search_results: [],
  search_parmas: [],
  reviews: [],
  OfferHeading: '',
  termAndCondition:[]
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setValue: (state, action) => {
      const { key, value } = action.payload
      console.log('key', key)
      console.log('value', value)
      state[key] = value
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setHomeCategories: (state, action) => {
      state.homeCategories = action.payload
    },
    setItineraries: (state, action) => {
      state.itineraries = action.payload
    },
    setBanners: (state, action) => {
      state.banners = action.payload
    },
    setFeaturedCategory: (state, action) => {
      state.featuredCategory = action.payload
    },
    setTermAndCondition: (state, action) => {
      state.termAndCondition = action.payload
    }
    
  }
})

export const {
  setValue,
  setCategories,
  setItineraries,
  setHomeCategories,
  setBanners,
  setFeaturedCategory,
  setTermAndCondition
} = globalSlice.actions
export default globalSlice.reducer
