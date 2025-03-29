import { setValue } from '../globalSlice' // Action from the global slice
import { get } from '../../constants/axiosClient' // Axios instance for API requests
import { API_ENDPOINTS } from '../../constants/apiEndpoints' // Endpoints

// Thunk to fetch navigation bar categories
export const fetchNavbarCategories = () => async (dispatch) => {


  // Set loader to true
  dispatch(setValue({ key: 'to_show_loader', value: true }))

  try {
    // Make an API call to get navbar categories
    const response = await get(API_ENDPOINTS.COMMON.GET_NAVBAR_CATEGORIES)
    const offerResponse = await get(API_ENDPOINTS.USERS.GET_OFFER_HEADING);

    

    // Check if the categories were fetched successfully
    if (
      response.message === 'NAV_CATEGORIES_FETCHED' &&
      response.success === true
    ) {
      const navbarCategories = response.data // Extract the data

      // Dispatch the categories to the global state
      dispatch(setValue({ key: 'NavBarCategories', value: navbarCategories }))
    } else {
      // Handle cases where the categories were not found
      console.warn('Navbar categories not found')
    }
    if(offerResponse.message === 'OFFER_FETCHED' && offerResponse.success === true) {
        dispatch(setValue({ key: 'OfferHeading', value: offerResponse.data }))

    }else{
         console.warn('No offer found  ')
    }
  } catch (error) {
    console.error('Error fetching navbar categories:', error)
  } finally {
    // Set loader to false
    dispatch(setValue({ key: 'to_show_loader', value: false }))
  }
}
