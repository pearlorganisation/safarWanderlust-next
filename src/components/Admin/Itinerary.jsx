import React, { useEffect, useState } from 'react'
import '../../index.css'
import CustomText from '../../components/CustomText'
import { light } from '../../assets/themes/themes'
import CustomCheckboxWithLabel from '../../components/CustomCheckboxWithLabel'
import CustomButton from '../../components/CustomButton'
import AdminTopbar from '../../components/AdminTopbar'
import AddIcon from '../../assets/svgs/logo/AddIcon'
import EditIcon from '../../assets/svgs/logo/EditIcon'
import ThreedotIcon from '../../assets/svgs/logo/ThreedotIcon'
import { API_ENDPOINTS } from '../../constants/apiEndpoints'
import { get, patch, post, put, remove } from '../../constants/axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import { setValue } from '../../redux/globalSlice'
import PaginationComp from '../../components/PaginationComp'
import { useNavigate } from 'react-router-dom'
import { PAGES } from '../../constants/PagesName'
import moment from 'moment'
import { showConfirmationDialog } from '../../App'
import { localStorageHelper } from '../../helper/storageHelper'
import AddNewItiComp from '../../components/AddNewItiComp'

function Itinerary() {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    is_modalopen: false,
    fetched_data: [],
    categories_data: [],
    categories_list: [],
    next_cursor_id: 0,
    prev_cursor_id: 0,
    total_pages: 0,
    current_page: 1,
    selected_itinerary: {},
    view_selected_itinerary: {},
    current_modal_page_count: 1,
    selected_category: [],
    iti_id: 0,
    iti_name: '',
    iti_city: '',
    iti_img: [''],
    iti_short_desc: '',
    iti_desc: '',
    iti_altitude: '',
    iti_duration: 1,
    iti_scenary: '',
    iti_cultural_site: '',
    iti_brochure_banner: '',
    iti_inclusion: '',
    iti_exclusion: '',
    iti_notes: '',
    is_active: null,
    is_trending: null,
    modal_open_purpose: 'add_new',
    to_show_error: false,
    page2_error: false,
    page3_error: false,
    page4_error: false,
    uploading: false
  })
  const [dayintro, setdayintro] = useState([])
  const [hotelinfo, sethotelinfo] = useState([])
  const [packagedetails, setpackagedetails] = useState([])
  const navigate = useNavigate()
  const fetch_itinerary = async (next_cursor = 0) => {
    dispatch(setValue({ key: 'to_show_loader', value: true }))
    try {
      const data = {
        isAdmin: true,
        cursor: next_cursor || ''
      }
      const data2 = { isAdmin: true }
      await get(
        API_ENDPOINTS.COMMON.GET_ITINERARY,
        next_cursor?.length > 0 ? data : data2
      ).then((d) => {
        if (d?.message == 'ITINERARIES_FETCHED' && d?.success == true) {
          dispatch(setValue({ key: 'to_show_loader', value: false }))
          setState((prevs) => ({
            ...prevs,
            fetched_data: d?.data?.itineraries,
            total_pages: d?.data?.totalPages,
            next_cursor_id: d?.data?.nextCursor,
            prev_cursor_id: d?.data?.previousCursor
          }))
          // console.log('logging data', d)
        }
      })
    } catch (error) {
      dispatch(setValue({ key: 'to_show_loader', value: false }))
      console.error(error)
      const err_response = error?.response?.data
      if (
        err_response.success == false &&
        err_response.message == 'VALIDATION_INVALID_TOKEN'
      ) {
        localStorageHelper.removeItem('login_data')
        navigate(PAGES.LOGIN, { replace: true })
      }
    }
  }
  const fetch_Itinerary_By_Id = async (id = 0, modal_purpose = 'view_page') => {
    dispatch(setValue({ key: 'to_show_loader', value: true }))
    try {
      await get(API_ENDPOINTS.COMMON.GET_ITINERARY + `/${id}`).then((d) => {
        if (d?.message == 'ITINERARY_FOUND' && d?.success == true) {
          dispatch(setValue({ key: 'to_show_loader', value: false }))
          setState((prevs) => ({
            ...prevs,
            current_modal_page_count: 1,
            modal_open_purpose: modal_purpose,
            iti_name: d?.data?.title,
            iti_desc: d?.data?.description,
            iti_short_desc: d?.data?.shortDescription,
            iti_city: d?.data?.city,
            iti_img: d?.data?.view_images,
            iti_duration: d?.data?.duration,
            iti_altitude: d?.data?.altitude,
            iti_scenary: d?.data?.scenery,
            iti_cultural_site: d?.data?.cultural_sites,
            iti_brochure_banner: d?.data?.itin_pdf,
            iti_notes: d?.data?.notes,
            selected_category: d?.data?.categoryId,
            iti_exclusion: d?.data?.inclusions_exclusions?.exclusions,
            iti_inclusion: d?.data?.inclusions_exclusions?.inclusions,
            is_modalopen: !prevs.is_modalopen
          }))
          setdayintro(d?.data?.day_details)
          sethotelinfo(d?.data?.hotels)
          setpackagedetails((prevs) => ({
            ...prevs,
            base_packages: d?.data?.base_packages,
            pickup_point: d?.data?.pickup_point,
            drop_point: d?.data?.drop_point,
            batches: d?.data?.batches
          }))
          if (modal_purpose == 'edit_iti') {
            setState((prevs) => ({ ...prevs, iti_id: id }))
          }
          // console.log('logging data', d)
        }
      })
    } catch (error) {
      dispatch(setValue({ key: 'to_show_loader', value: false }))
      console.error(error)
      const err_response = error?.response?.data
      if (
        err_response.success == false &&
        err_response.message == 'VALIDATION_INVALID_TOKEN'
      ) {
        localStorageHelper.removeItem('login_data')
        navigate(PAGES.LOGIN, { replace: true })
      }
    }
  }
  useEffect(() => {
    fetch_itinerary()
  }, [])

  const handleToggleChange = async ({ id }) => {
    dispatch(setValue({ key: 'to_show_loader', value: true }))
    try {
      await patch(API_ENDPOINTS.ADMIN.TOGGLE_ITINERARY_ACTIVE + '/' + id).then(
        (d) => {
          if (d?.message == 'ITINERARIES_UPDATED' && d?.success == true) {
            dispatch(setValue({ key: 'to_show_loader', value: false }))
            dispatch(
              setValue({
                key: 'to_show_alert',
                value: true
              })
            ),
              dispatch(
                setValue({
                  key: 'alert_content',
                  value: 'Itineraries Updated Successfully'
                })
              )
            fetch_itinerary(state.fetched_data[0]?.id)
          }
        }
      )
    } catch (error) {
      dispatch(setValue({ key: 'to_show_loader', value: false }))
      console.error(error)
      const err_response = error?.response?.data
      if (
        err_response.success == false &&
        err_response.message == 'VALIDATION_INVALID_TOKEN'
      ) {
        localStorageHelper.removeItem('login_data')
        navigate(PAGES.LOGIN, { replace: true })
      }
    }
  }
  const handleiIsTrendingChange = async ({ id, is_trend }) => {
    dispatch(setValue({ key: 'to_show_loader', value: true }))
    try {
      await patch(
        API_ENDPOINTS.ADMIN.UPDATE_IS_TRENDING_STATUS +
          `?id=${id}&is_trending=${is_trend}`
      ).then((d) => {
        if (d?.message == 'TRENDING_ITIN_UPDATED' && d?.success == true) {
          dispatch(setValue({ key: 'to_show_loader', value: false }))
          dispatch(
            setValue({
              key: 'to_show_alert',
              value: true
            })
          ),
            dispatch(
              setValue({
                key: 'alert_content',
                value: 'Itineraries Trending Status Changed Successfully'
              })
            )
          fetch_itinerary(state.fetched_data[0]?.id)
        }
      })
    } catch (error) {
      dispatch(setValue({ key: 'to_show_loader', value: false }))
      console.error(error)
      const err_response = error?.response?.data
      if (
        err_response.success == false &&
        err_response.message == 'VALIDATION_INVALID_TOKEN'
      ) {
        localStorageHelper.removeItem('login_data')
        navigate(PAGES.LOGIN, { replace: true })
      }
    }
  }

  const handleAddNewItinerary = () => {
    setState((prevs) => ({
      ...prevs,
      current_modal_page_count: 1,
      is_modalopen: !prevs.is_modalopen,
      iti_name: '',
      iti_desc: '',
      iti_short_desc: '',
      iti_city: '',
      iti_img: [''],
      iti_duration: 1,
      iti_altitude: '',
      iti_scenary: '',
      iti_cultural_site: '',
      iti_brochure_banner: '',
      iti_notes: '',
      categoryId: [],
      iti_inclusion: '',
      iti_exclusion: '',
      modal_open_purpose: 'add_new'
    }))
    setdayintro([])
    sethotelinfo([])
    setpackagedetails([])
  }
  const delete_Iti = async ({ id }) => {
    const isConfirmed = await showConfirmationDialog(dispatch)
    if (isConfirmed) {
      dispatch(setValue({ key: 'to_show_loader', value: true }))
      try {
        await remove(API_ENDPOINTS.ADMIN.POST_NEW_ITINERARY + `/${id}`).then(
          (d) => {
            if (d.message == 'ITINERARY_DELETED' && d.success == true) {
              dispatch(
                setValue({
                  key: 'to_show_loader',
                  value: false
                }),
                dispatch(
                  setValue({
                    key: 'to_show_alert',
                    value: true
                  })
                ),
                dispatch(
                  setValue({
                    key: 'alert_content',
                    value: 'Itinerary Deleted'
                  })
                ),
                fetch_itinerary(state.fetched_data[0]?.id)
              )
            }
          }
        )
      } catch (error) {
        dispatch(setValue({ key: 'to_show_loader', value: false }))
        console.error(error)
        const err_response = error?.response?.data
        if (
          err_response.success == false &&
          err_response.message == 'VALIDATION_INVALID_TOKEN'
        ) {
          localStorageHelper.removeItem('login_data')
          navigate(PAGES.LOGIN, { replace: true })
        }
      }
    }
  }
  return (
    <div className=" flex h-screen w-full  bg-white ">
      <div className="ml-0 w-full animate-fadeIn rounded-2xl bg-white p-16 sm:ml-60 ">
        <AdminTopbar topbar_title={'Itinerary'} />
        <div className="mt-10 flex flex-wrap justify-between">
          <CustomText
            secondaryfontweight
            fontsize="16px"
            content={'List of Itinerary'}
            className="text-black"
          />
          <div className="  items-center justify-center">
            <CustomButton
              logo_path={
                <div className="mr-3">
                  <AddIcon />
                </div>
              }
              content={'Add New Itinerary'}
              btncolor={light.signinbtnbackground}
              onClick={() => handleAddNewItinerary()}
            />
          </div>
        </div>
        <div className="mt-3 ">
          <table className="min-w-full border-collapse text-center  ">
            <thead className="rounded-full bg-inputbg p-5">
              <tr>
                <th className="rounded-l-lg px-4 py-2">
                  <CustomText
                    content={'Sr No.'}
                    fontsize="13px"
                    secondaryfontweight
                  />
                </th>
                <th className=" px-4 py-2 text-start">
                  <CustomText
                    content={'Itinerary'}
                    fontsize="13px"
                    secondaryfontweight
                  />
                </th>
                <th className=" px-4 py-2 text-start">
                  <CustomText
                    content={'Travel Location'}
                    fontsize="13px"
                    secondaryfontweight
                  />
                </th>
                <th className=" px-4 py-2 text-start">
                  <CustomText
                    content={'Price Onwards'}
                    fontsize="13px"
                    secondaryfontweight
                  />
                </th>
                <th className=" px-4 py-2">
                  <CustomText
                    content={'Trending'}
                    fontsize="13px"
                    secondaryfontweight
                  />
                </th>
                <th className=" px-4 py-2">
                  <CustomText
                    content={'Status'}
                    fontsize="13px"
                    secondaryfontweight
                  />
                </th>
                <th className=" px-4 py-2"></th>
                <th className="rounded-r-lg px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="w-auto">
              {state.fetched_data?.length > 0 ? (
                state.fetched_data?.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="px-4 py-2">
                        <CustomText
                          content={index + 1 + '.' || 'NA'}
                          fontsize="13px"
                          secondaryfontweight
                        />
                      </td>
                      <td className="px-4 py-2 text-start">
                        <CustomText
                          content={item?.title || 'NA'}
                          fontsize="13px"
                          secondaryfontweight
                        />
                      </td>
                      <td className="px-4 py-2 text-start">
                        <CustomText
                          content={item?.city || 'NA'}
                          fontsize="13px"
                          secondaryfontweight
                        />
                      </td>
                      <td className="px-4 py-2 text-start">
                        <CustomText
                          content={
                            '₹' +
                              item?.startin_price?.toLocaleString('en-IN') +
                              '/-' || 'NA'
                          }
                          fontsize="13px"
                          secondaryfontweight
                        />
                      </td>
                      <td className="mx-auto w-2 px-10 py-2">
                        <CustomCheckboxWithLabel
                          content={''}
                          defaultchecked={item?.is_trending || false}
                          checked_color="#3E4947"
                          onChange={(e) => {
                            setState((prevs) => ({
                              ...prevs,
                              selected_itinerary: item
                            })),
                              handleiIsTrendingChange({
                                id: item?.id,
                                is_trend: !item.is_trending
                              })
                          }}
                          // disabled={true}
                        />
                      </td>
                      <td>
                        <div
                          className={`${
                            (item?.is_active || false) == true
                              ? 'bg-btnactivecolor'
                              : 'bg-btninactivecolor'
                          } mx-2 rounded-2xl`}
                        >
                          <CustomText
                            content={
                              (item?.is_active || false) == true
                                ? 'Active'
                                : 'Inactive'
                            }
                            fontsize="13px"
                            secondaryfontweight
                            className="select-none py-[6px] text-white"
                          />
                        </div>
                      </td>
                      <td className="mx-auto w-2 px-4 py-2">
                        <CustomButton
                          className="ml-3"
                          logo_path={<EditIcon />}
                          content={''}
                          onClick={() =>
                            fetch_Itinerary_By_Id(item?.id, 'edit_iti')
                          }
                        />
                      </td>
                      <td className="group relative mx-auto w-2 px-4 py-2">
                        <CustomButton
                          logo_path={<ThreedotIcon />}
                          content={''}
                        />
                        <div className="shadow-[rgba(0, 0, 0.25)] absolute right-10 top-10 z-20 hidden rounded-lg bg-white p-5 px-6 text-start shadow-2xl group-hover:block">
                          <div
                            onClick={() => {
                              fetch_Itinerary_By_Id(item?.id)
                            }}
                            className="mb-2 cursor-pointer select-none transition-transform duration-75 active:scale-95"
                          >
                            View Page
                          </div>
                          <div
                            onClick={() => {
                              fetch_Itinerary_By_Id(item?.id, 'duplicate_iti')
                            }}
                            className="mb-2 cursor-pointer select-none transition-transform duration-75 active:scale-95"
                          >
                            Duplicate Itinerary
                          </div>
                          <div
                            onClick={() => handleToggleChange({ id: item?.id })}
                            className="mb-2 cursor-pointer select-none transition-transform duration-75 active:scale-95"
                          >
                            {(item?.is_active || false) == true
                              ? 'Inactive'
                              : 'Active'}
                          </div>
                          <div
                            onClick={() => delete_Iti({ id: item?.id })}
                            className="cursor-pointer select-none text-deletetextcolor transition-transform duration-75 active:scale-95"
                          >
                            Delete
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="100%" className="p-0">
                        <hr className="my-1 w-full bg-bordercolor" />
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-end ">
            <PaginationComp
              total_pages={state.total_pages}
              current_page={state.current_page}
              prevonClick={() => {
                if (
                  state.current_page - 1 != 0 &&
                  state.prev_cursor_id?.length > 0
                ) {
                  setState((prevs) => ({
                    ...prevs,
                    current_page: prevs.current_page - 1
                  }))
                  fetch_itinerary(state.prev_cursor_id)
                }
              }}
              onClick={(e) => {
                if (
                  state.current_page != e &&
                  state.next_cursor_id?.length > 0 &&
                  state.current_page + 1 == e
                ) {
                  setState((prevs) => ({ ...prevs, current_page: e }))
                  fetch_itinerary(state.next_cursor_id)
                } else if (
                  state.current_page != e &&
                  state.prev_cursor_id?.length > 0 &&
                  state.current_page - 1 == e
                ) {
                  setState((prevs) => ({ ...prevs, current_page: e }))
                  fetch_itinerary(state.prev_cursor_id)
                }
              }}
              nextonClick={() => {
                if (
                  state.current_page + 1 <= state.total_pages &&
                  state.next_cursor_id?.length > 0
                ) {
                  setState((prevs) => ({
                    ...prevs,
                    current_page: prevs.current_page + 1
                  }))
                  fetch_itinerary(state.next_cursor_id)
                }
              }}
            />
          </div>
        </div>
        <AddNewItiComp
          state={state}
          setState={setState}
          dayintro={dayintro}
          setdayintro={setdayintro}
          hotelinfo={hotelinfo}
          sethotelinfo={sethotelinfo}
          packagedetails={packagedetails}
          setpackagedetails={setpackagedetails}
          fetch_iti={fetch_itinerary}
        />
      </div>
    </div>
  )
}

export default Itinerary
