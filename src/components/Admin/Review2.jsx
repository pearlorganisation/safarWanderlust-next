import React, { useEffect, useState } from 'react'
import '../../index.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setValue } from '../../redux/globalSlice'
import { get, post, put, remove } from '../../constants/axiosClient'
import { API_ENDPOINTS } from '../../constants/apiEndpoints'
import { PAGES } from '../../constants/PagesName'
import { localStorageHelper } from '../../helper/storageHelper'
import moment from 'moment'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Modal from '@mui/material/Modal';
import { RxCross2 } from 'react-icons/rx';
import Checkbox from '@mui/material/Checkbox';

// Components
import AdminTopbar from '../../components/AdminTopbar'
import CustomText from '../../components/CustomText'
import CustomButton from '../../components/CustomButton'
import CustomModal from '../../components/CustomModal'
import PaginationComp from '../../components/PaginationComp'
import CustomSelect from '../../components/CustomSelect'
import Sidebar from '../../components/Sidebar'
import CustomInput from '../../components/CustomInput'
import CustomCheckboxWithLabel from '../../components/CustomCheckboxWithLabel'
import { showConfirmationDialog } from '../../App'

// Icons
import AddIcon from '../../assets/svgs/logo/AddIcon'
import ThreedotIcon from '../../assets/svgs/logo/ThreedotIcon'

// Add this modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '800px', // increased width
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  outline: 'none',
  p: 4
};

function Review() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const [state, setState] = useState({
    is_modalopen: false,
    fetched_data: [],
    current_page: 1,
    total_pages: 0,
    next_cursor_id: 0,
    prev_cursor_id: 0,
    selected_review: {},
    modal_open_purpose: 'view', // 'view', 'edit', 'add'
    review_text: '',
    reviewer_name: '',
    reviewer_image: '',
    rating: 1,
    itineraryId: '',
    to_show_error: false,
    itineraries: [],
    selectedItinerary: null,
    isDropdownOpen: false,
  })

  // Add state for pending updates
  const [pendingUpdates, setPendingUpdates] = useState({});

  // First, add this new state for search
  const [searchTerm, setSearchTerm] = useState('');

  // CRUD Operations
  const fetch_reviews = async (next_cursor = 0) => {
    dispatch(setValue({ key: 'to_show_loader', value: true }))
    try {
      let updated_api = API_ENDPOINTS.REVIEWS.GET_ALL_REVIEWS
      if (next_cursor != null && next_cursor != 0) {
        updated_api += `?cursor=${next_cursor}`
      }
      
      await get(updated_api).then((d) => {
        if (d?.message === 'REVIEWS_FETCHED' && d?.success === true) {
          console.log('Raw reviews data:', d?.data?.reviews);
          
          // More careful conversion of isLandingPage to boolean
          const processedReviews = d?.data?.reviews.map(review => ({
            ...review,
            isLandingPage: review.isLandingPage === true || review.isLandingPage === 1
          }));
          
          console.log('Processed reviews:', processedReviews);
          
          setState((prevs) => ({
            ...prevs,
            fetched_data: processedReviews,
            total_pages: d?.data?.totalPages,
            next_cursor_id: d.data?.nextCursor,
            prev_cursor_id: d.data?.previousCursor
          }))
        }
      })
    } catch (error) {
      handleError(error)
    } finally {
      dispatch(setValue({ key: 'to_show_loader', value: false }))
    }
  }

  const create_review = async () => {
    if (!validateReviewData()) return

    dispatch(setValue({ key: 'to_show_loader', value: true }))
    try {
      const data_to_send = {
        text: state.review_text,
        reviewer_name: state.reviewer_name,
        reviewer_image: state.reviewer_image,
        rating: Number(state.rating),
        isLandingPage: false,
        itineraryId: state.itineraryId || null
      }

      const response = await post(API_ENDPOINTS.REVIEWS.CREATE_REVIEW, data_to_send);
      console.log('API Response:', response);

      // Simplified success check
      if (response?.success) {
        // Close modal immediately
        setState(prev => ({
          ...prev,
          is_modalopen: false
        }));

        // Reset form in a separate state update
        setState(prev => ({
          ...prev,
          review_text: '',
          reviewer_name: '',
          reviewer_image: '',
          rating: 1,
          itineraryId: '',
          isDropdownOpen: false
        }));

        // Reset search term
        setSearchTerm('');
        
        // Then fetch the updated reviews
        await fetch_reviews();
        
        // Finally show the success message
        dispatch(setValue({ key: 'to_show_alert', value: true }));
        dispatch(setValue({ key: 'alert_content', value: 'Review Created Successfully' }));
      }
    } catch (error) {
      console.error('Create review error:', error);
      handleError(error)
    } finally {
      dispatch(setValue({ key: 'to_show_loader', value: false }))
    }
  }

  const update_review = async () => {
    if (!validateReviewData()) return

    dispatch(setValue({ key: 'to_show_loader', value: true }))
    try {
      const data_to_send = {
        text: state.review_text,
        reviewer_name: state.reviewer_name,
        reviewer_image: state.reviewer_image,
        rating: Number(state.rating),
        isLandingPage: state.selected_review.isLandingPage,
        itineraryId: state.itineraryId || null
      }

      await put(
        `${API_ENDPOINTS.REVIEWS.UPDATE_REVIEW}/${state.selected_review.id}`,
        data_to_send
      ).then((d) => {
        if (d?.message === 'REVIEW_UPDATED' && d?.success === true) {
          handleSuccess('Review Updated Successfully')
          fetch_reviews()
        }
      })
    } catch (error) {
      handleError(error)
    }
  }

  const delete_review = async (id) => {
    const isConfirmed = await showConfirmationDialog(dispatch)
    if (isConfirmed) {
      dispatch(setValue({ key: 'to_show_loader', value: true }))
      try {
        await remove(`${API_ENDPOINTS.REVIEWS.DELETE_REVIEW}/${id}`).then((d) => {
          if (d?.message === 'REVIEW_DELETED' && d?.success === true) {
            handleSuccess('Review Deleted Successfully')
            fetch_reviews()
          }
        })
      } catch (error) {
        handleError(error)
      }
    }
  }

  // Helper Functions
  const handleError = (error) => {
    dispatch(setValue({ key: 'to_show_loader', value: false }))
    console.error(error)
    const err_response = error?.response?.data
    if (
      err_response?.success === false &&
      err_response?.message === 'VALIDATION_INVALID_TOKEN'
    ) {
      localStorageHelper.removeItem('login_data')
      navigate(PAGES.LOGIN, { replace: true })
    }
  }

  const handleSuccess = (message) => {
    setState((prevs) => ({ 
      ...prevs, 
      is_modalopen: false,
      review_text: '',
      reviewer_name: '',
      reviewer_image: '',
      rating: 1,
      itineraryId: '',
      isDropdownOpen: false  // Add this to ensure dropdown is closed
    }))
    dispatch(setValue({ key: 'to_show_loader', value: false }))
    dispatch(setValue({ key: 'to_show_alert', value: true }))
    dispatch(setValue({ key: 'alert_content', value: message }))
  }

  const validateReviewData = () => {
    if (
      !state.review_text?.trim() ||
      !state.reviewer_name?.trim() ||
      !state.reviewer_image?.trim() ||
      !state.rating ||
      state.rating < 1 ||
      state.rating > 5
    ) {
      setState((prevs) => ({ ...prevs, to_show_error: true }))
      return false
    }
    return true
  }

  const fetchItineraries = async () => {
    try {
      const response = await get('/common/itineraries')
      if (response?.success && response?.data?.itineraries) {
        setState(prev => ({
          ...prev,
          itineraries: response.data.itineraries
        }))
      }
    } catch (error) {
      console.error('Error fetching itineraries:', error)
    }
  }

  useEffect(() => {
    fetch_reviews()
    fetchItineraries()
  }, [])

  const handleSidebarHover = (isHovered) => {
    setSidebarOpen(isHovered)
  }

  // Add this function to filter itineraries
  const filteredItineraries = state.itineraries.filter(itinerary => 
    itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    itinerary.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (state.isDropdownOpen && !event.target.closest('.searchable-select')) {
        setState(prev => ({ ...prev, isDropdownOpen: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.isDropdownOpen]);

  // Add this new useEffect to handle setting the search term when editing
  useEffect(() => {
    if (state.modal_open_purpose === 'edit' && state.itineraryId) {
      const selectedItinerary = state.itineraries.find(it => it.id === state.itineraryId);
      if (selectedItinerary) {
        setSearchTerm(`${selectedItinerary.title} - ${selectedItinerary.city}`);
      }
    }
  }, [state.modal_open_purpose, state.itineraryId, state.itineraries]);

  return (
    <div className="h-screen w-full flex bg-white">
      <Sidebar onHover={handleSidebarHover} isOpen={sidebarOpen} />

      <div className="w-full bg-white p-16 rounded-2xl animate-fadeIn ml-0 sm:ml-60">
        <AdminTopbar 
          topbar_title={'Reviews'} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <div className="flex justify-end items-center mt-8">
          <div className="flex items-center gap-3">
            <CustomButton
              className="bg-gradient-to-r from-[#FF8D38] to-[#FF5F06] text-white"
              text_classname="text-white"
              content="Add New Review"
              logo_path={<AddIcon className="w-4 h-4" />}
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  is_modalopen: true,
                  modal_open_purpose: 'add',
                  to_show_error: false
                }))
              }
            />
          </div>

        </div>

        {/* Table Component */}
        <div className="mt-8">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reviewer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Landing Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {state.fetched_data.map((review) => (
                
                <tr key={review.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={review.reviewer_image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {review.reviewer_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{review.rating}/5</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Checkbox
                      checked={review.isLandingPage === true || review.isLandingPage === 1}
                      onChange={async (e) => {
                        const newValue = e.target.checked;
                        console.log('Changing isLandingPage to:', newValue);
                        
                        dispatch(setValue({ key: 'to_show_loader', value: true }));
                        
                        try {
                          const data_to_send = {
                            isLandingPage: newValue
                          };
                          
                          const response = await put(
                            `${API_ENDPOINTS.REVIEWS.UPDATE_REVIEW}/${review.id}`,
                            data_to_send
                          );
                          
                          console.log('Update response:', response);
                          
                          if (response?.success) {
                            dispatch(setValue({ key: 'to_show_alert', value: true }));
                            dispatch(setValue({ 
                              key: 'alert_content', 
                              value: 'Landing page status updated successfully' 
                            }));
                            fetch_reviews();
                          }
                        } catch (error) {
                          console.error('Update error:', error);
                          handleError(error);
                          
                          dispatch(setValue({ key: 'to_show_alert', value: true }));
                          dispatch(setValue({ 
                            key: 'alert_content', 
                            value: 'Failed to update landing page status' 
                          }));
                        } finally {
                          dispatch(setValue({ key: 'to_show_loader', value: false }));
                        }
                      }}
                      size="small"
                      sx={{
                        color: '#FF8D38',
                        '&.Mui-checked': {
                          color: '#FF8D38',
                        },
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {moment(review.createdAt).format('MMM DD, YYYY')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          const selectedItinerary = state.itineraries.find(it => it.id === review.itineraryId);
                          setState(prev => ({
                            ...prev,
                            selected_review: review,
                            modal_open_purpose: 'edit',
                            is_modalopen: true,
                            review_text: review.text,
                            reviewer_name: review.reviewer_name,
                            reviewer_image: review.reviewer_image,
                            rating: review.rating,
                            itineraryId: review.itineraryId || ''
                          }));
                          if (selectedItinerary) {
                            setSearchTerm(`${selectedItinerary.title} - ${selectedItinerary.city}`);
                          } else {
                            setSearchTerm('');
                          }
                        }}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        title="Edit Review"
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => delete_review(review.id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        title="Delete Review"
                      >
                        <RiDeleteBin6Line className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <PaginationComp
            total_pages={state.total_pages}
            current_page={state.current_page}
            prevonClick={() => {
              if (state.current_page > 1) {
                setState(prev => ({ ...prev, current_page: prev.current_page - 1 }))
                fetch_reviews(state.prev_cursor_id)
              }
            }}
            nextonClick={() => {
              if (state.current_page < state.total_pages) {
                setState(prev => ({ ...prev, current_page: prev.current_page + 1 }))
                fetch_reviews(state.next_cursor_id)
              }
            }}
          />
        </div>

        {/* Modal */}
        <Modal
          open={state.is_modalopen}
          onClose={() => {
            setState(prev => ({ 
              ...prev, 
              is_modalopen: false,
              itineraryId: '',
              isDropdownOpen: false 
            }));
            setSearchTerm('');
          }}
          aria-labelledby="review-modal"
          slotProps={{
            backdrop: {
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.2)'
              }
            }
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            bg-white rounded-lg shadow-xl w-[90%] max-w-[800px] outline-none">
            {/* Close button */}
            <button 
              onClick={() => {
                setState(prev => ({ 
                  ...prev, 
                  is_modalopen: false,
                  itineraryId: '',
                  isDropdownOpen: false 
                }));
                setSearchTerm('');
              }}
              className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <RxCross2 size={24} />
            </button>

            {/* Modal header */}
            <div className="px-6 py-4 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">Add Review</h2>
            </div>

            {/* Modal content */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Reviewer Name */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reviewer Name
                  </label>
                  <input
                    type="text"
                    value={state.reviewer_name}
                    onChange={e => setState(prev => ({ ...prev, reviewer_name: e.target.value }))}
                    className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 
                      rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                      transition-all duration-200 ease-in-out
                      hover:border-orange-400
                      text-sm"
                    placeholder="Enter reviewer's name"
                  />
                  {state.to_show_error && !state.reviewer_name.trim() && (
                    <p className="mt-1 text-sm text-red-600">Reviewer name is required</p>
                  )}
                </div>

                {/* Reviewer Image URL */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reviewer Image URL
                  </label>
                  <input
                    type="text"
                    value={state.reviewer_image}
                    onChange={e => setState(prev => ({ ...prev, reviewer_image: e.target.value }))}
                    className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 
                      rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                      transition-all duration-200 ease-in-out
                      hover:border-orange-400
                      text-sm"
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                  />
                  {state.to_show_error && !state.reviewer_image.trim() && (
                    <p className="mt-1 text-sm text-red-600">Reviewer image URL is required</p>
                  )}
                </div>

                {/* Review Text */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Review Text
                  </label>
                  <textarea
                    value={state.review_text}
                    onChange={e => setState(prev => ({ ...prev, review_text: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 
                      rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                      transition-all duration-200 ease-in-out
                      hover:border-orange-400
                      text-sm resize-none"
                    placeholder="Enter the review content..."
                  />
                  {state.to_show_error && !state.review_text.trim() && (
                    <p className="mt-1 text-sm text-red-600">Review text is required</p>
                  )}
                </div>

                {/* Rating */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={state.rating}
                    onChange={e => setState(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 
                      rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                      transition-all duration-200 ease-in-out
                      hover:border-orange-400
                      text-sm"
                    placeholder="Enter rating between 1 and 5"
                  />
                  {state.to_show_error && (state.rating < 1 || state.rating > 5) && (
                    <p className="mt-1 text-sm text-red-600">Rating must be between 1 and 5</p>
                  )}
                </div>

                {/* Itinerary Selection - keeping the existing searchable select styling */}
                <div className="w-full relative searchable-select">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Itinerary
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search itineraries..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setState(prev => ({ ...prev, isDropdownOpen: true }));
                      }}
                      onFocus={() => setState(prev => ({ ...prev, isDropdownOpen: true }))}
                      className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 
                        rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                        transition-all duration-200 ease-in-out
                        hover:border-orange-400
                        text-sm"
                    />
                    {state.itineraryId && (
                      <button
                        onClick={() => {
                          setState(prev => ({ ...prev, itineraryId: '' }));
                          setSearchTerm('');
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  
                  {state.isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredItineraries.length > 0 ? (
                        filteredItineraries.map(itinerary => (
                          <div
                            key={itinerary.id}
                            onClick={() => {
                              setState(prev => ({
                                ...prev,
                                itineraryId: itinerary.id,
                                isDropdownOpen: false
                              }));
                              setSearchTerm(`${itinerary.title} - ${itinerary.city}`);
                            }}
                            className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-sm text-gray-700
                              transition-colors duration-150 ease-in-out"
                          >
                            <div className="font-medium">{itinerary.title}</div>
                            <div className="text-gray-500 text-xs">{itinerary.city}</div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">No itineraries found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t bg-gray-50 rounded-b-lg flex justify-end gap-3">
              <button
                onClick={() => {
                  setState(prev => ({ 
                    ...prev, 
                    is_modalopen: false,
                    itineraryId: '',
                    isDropdownOpen: false 
                  }));
                  setSearchTerm('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                  rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-orange-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => state.modal_open_purpose === 'add' ? create_review() : update_review()}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 
                  rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                {state.modal_open_purpose === 'add' ? 'Create Review' : 'Update Review'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Review