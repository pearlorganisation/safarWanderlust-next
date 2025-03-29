import { setFeaturedCategory, setValue } from '../globalSlice'
import { get } from '../../constants/axiosClient'
import { API_ENDPOINTS } from '../../constants/apiEndpoints'

export const fetchFeaturedCategory = () => async (dispatch) => {
  //dispatch(setValue({ key: 'to_show_loader', value: true }))

  try {
    await get(API_ENDPOINTS.USERS.GET_FREATURED_CATEGORY).then((d) => {
      if (d.success == true) {

        const featuredCwtgories = d.data.map((category) => ({
          id: category.id,
          name: category.name,
          image: category.image,
          description: category.description,
          short_description: category.short_description,
          itineraries: category.itinerary,
          banner_image: category.banner_image,
          route_map: category.route_map
        }))
        dispatch(setFeaturedCategory(featuredCwtgories))
      }
    })
  } catch (error) {
    console.error(error)
  } finally {
    //dispatch(setValue({ key: 'to_show_loader', value: false }))
  }
}
