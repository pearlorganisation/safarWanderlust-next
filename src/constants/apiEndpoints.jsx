export const API_ENDPOINTS = {
  USERS: {
    AUTHENTICATE_USER: '/admin/auth/login',
    GET_BANNER: '/user/banner',
    GET_FREATURED_CATEGORY: '/user/home_catgories',
    GET_TRENDING_ITINERARY: '/user/trending',
    GET_GALLERY: '/user/get_gallery',
    PUT_BANNER_COUNT: '/user/banner',
    CREATE_TRIP_REQUEST: '/user/request',
    GET_REVIEWS: '/user/get_reviews',
    GET_OFFER_HEADING: '/user/offer',
    GET_TERM_CONDITIONS: '/user/terms_and_conditions',
    GET_ITIN_BY_NAME: '/user/itineraries',
    GET_CAT_BY_NAME: '/user/categories',
    CALLBACK_REQUEST: '/user/callback_request'
  },
  ADMIN: {
    AUTHENTICATE_USER: '/admin/auth/login',
    GET_DASHBOARD_DATA: '/admin/dashboard',
    POST_OFFER_BANNER: '/admin/banner',
    TOGGLE_ITINERARY_ACTIVE: '/admin/toggle-itinerary-active',
    GET_ALL_ADMIN: '/admin/get-all-admin',
    REGISTER_NEW_ADMIN: '/admin/auth/register',
    CHANGE_ADMIN_PASS: '/admin/change-password',
    GET_ALL_BOOKINGS: '/admin/get-all-bookings',
    GET_BOOKINGS_BY_ID: '/admin/get-booking',
    GET_REQUEST: '/admin/get_requests',
    DELETE_ADMIN: '/admin/delete-admin',
    ADMIN_ROLE_UPDATE: '/admin/toggle-admin-role',
    UPDATE_REQUEST_STATUS: '/admin/update_request_status',
    UPDATE_OFFER_HEADLINE: '/admin/update-offer-headline',
    UPDATE_TERMS: '/admin/update-terms',
    UPDATE_CANCELLATION: '/admin/cancellation_policy',
    GET_CONTENTS: '/admin/get-contents',
    POST_NEW_ITINERARY: '/admin/itinerary',
    POST_NEW_CATEGORY: '/admin/category',
    UPDATE_IS_TRENDING_STATUS: '/admin/toggle-trending',
    UPDATE_GALLERY: '/admin/update-gallery',
    DELETE_IMAGE_FROM_GALLERY: '/admin/delete-image',
    UPDATE_HERO_ITI: '/admin/update_hero_itin',
    UPDATE_HERO_CATEGORIES: '/admin/home_categories',
    UPDATE_NAV_CATEGORIES: '/admin/nav_categories',
    DELETE_BANNER: '/admin/banner',
    UPDATE_CATEGORY_ORDER: '/admin/categories-order'
  },
  COMMON: {
    GET_ITINERARY: '/common/itineraries',
    GET_DASHBOARD_DATA: '/admin/dashboard',
    GET_CATEGORIES: '/common/categories',
    GET_HOME_CATEGORIES: '/common/home_catgories',
    GET_HERO_ITINERARY: '/common/hero_itinerary',
    GET_NAVBAR_CATEGORIES: 'common/nav_categories',
    GET_SEARCH_RESULT: '/common/search',
    GET_ALL_CATEGORIES: '/common/categories',
    GET_ALL_TERMS: '/user/terms_and_conditions',
    GET_ALL_POLICY: '/common/cancellation_policies'
  },
  COMMENTS: {
    GET_COMMENTS: '/comments',
    CREATE_COMMENT: '/comments'
  },
  REVIEWS: {
    CREATE_REVIEW: '/review',
    GET_ALL_REVIEWS: '/review',
    GET_REVIEW_BY_ID: '/review',
    UPDATE_REVIEW: '/review',
    DELETE_REVIEW: '/review',
    TOGGLE_APPROVAL: '/reviews/toggle-approval',
    GET_LANDING_PAGE_REVIEWS: '/review?isLandingPage=true',
  },
  BOOKING: {
    NEW_BOOKING: '/booking/new-booking'
  }
}
