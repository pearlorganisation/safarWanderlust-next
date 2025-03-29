import { createSlice } from '@reduxjs/toolkit'

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
    }
  }
})

export const {
  setValue,
  setCategories,
  setItineraries,
  setHomeCategories,
  setBanners,
  setFeaturedCategory
} = globalSlice.actions
export default globalSlice.reducer
