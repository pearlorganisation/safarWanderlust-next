import { setHomeCategories, setValue } from '../globalSlice'
import { get } from '../../constants/axiosClient'
import { API_ENDPOINTS } from '../../constants/apiEndpoints'

export const fetchHomeCategories = () => async (dispatch) => {
  // dispatch(setValue({ key: 'to_show_loader', value: true }))


  try {
    await get(API_ENDPOINTS.COMMON.GET_HOME_CATEGORIES).then((d) => {

      if (d.message == 'CATEGORIES_FETCHED' && d.success == true) {
        const homeCategories = d.data.map((category) => ({
          id: category.id,
          name: category.name,
          image: category.image,
          banner_image: category.banner_image,
          description: category.description,
          short_description: category.short_description,
          route_map: category.route_map,
          is_home: category.is_home
        }))
        dispatch(setHomeCategories(homeCategories))
        // Optionally, you can also set itineraries if needed
      }
    })
  } catch (error) {
    console.error('Failed to fetch data', error)
  } finally {
    //   dispatch(setValue({ key: 'to_show_loader', value: false })) // Hide loader after fetching
  }
}
