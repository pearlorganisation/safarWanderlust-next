"use client"

import CustomText from '../../components/CustomText'
import AdminTopbar from '../../components/AdminTopbar'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../components/CustomButton'
import AddIcon from '@/_assets/svgs/logo/AddIcon'
// import EditIcon from '@/_assets/svgs/logo/EditIcon'
// import ThreedotIcon from '@/_assets/svgs/logo/ThreedotIcon'
import { light } from '@/_assets/themes/themes'
import CustomModal from '../../components/CustomModal'
// import CustomSelect from '../../components/CustomSelect'
import CustomInputFile from '../../components/CustomInputFile'
// import { MdLocationPin } from 'react-icons/md'
// import CustomRadioButtonGroup from '../../components/CustomRadioButtonGroup'
import {
  Box,
  List,
  ListItem,
  Pagination,
  PaginationItem,
  styled,
  Switch
} from '@mui/material'
import { API_ENDPOINTS } from '../../constants/apiEndpoints'
import { get, patch, post, put, remove } from '../../constants/axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import globalSlice, { setValue } from '@/lib/globalSlice'
// import PaginationComp from '../../components/PaginationComp'
import CustomInput from '../../components/CustomInput'
import CustomAccordion from '../../components/CustomAccordion'
import { useRouter } from 'next/navigation'
import { PAGES } from '../../constants/PagesName'
import { SlCalender } from 'react-icons/sl'
import { FiMapPin } from 'react-icons/fi'
import { CgArrowsExchangeAlt } from 'react-icons/cg'
// import { showConfirmationDialog } from '../../App'
import { localStorageHelper } from '../../helper/storageHelper'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { showConfirmationDialog } from '../Dialog/ShowConfirmationDialog'
import useAuthRedirect from '@/hooks/useAuthRedirect'

function Category() {

  useAuthRedirect();

  const [state, setState] = useState({
    is_modalopen: false,
    fetched_data: [],
    total_itineraries: [],
    added_itineraries: [],
    next_cursor_id: 0,
    prev_cursor_id: 0,
    total_pages: 0,
    current_page: 1,
    selected_itinerary: {},
    selected_category: {},
    to_which_modal_content: 'view_cat',
    cat_name: '',
    cat_short_desc: '',
    cat_desc: '',
    cat_is_home: false,
    banner_img: null,
    key1_name: '',
    key2_name: '',
    key3_name: '',
    key4_name: '',
    feat_img: null,
    key1_img: null,
    key2_img: null,
    key3_img: null,
    key4_img: null,
    keysarr: [],
    iti_fetch_count: 0,
    to_show_error: false,
    updated_data: []
  })
  const globalState = useSelector((state) => state.global)
  const dispatch = useDispatch()
  const router = useRouter()
  const fetch_All_Categories = async (next_cursor = 0) => {
    dispatch(setValue({ key: 'to_show_loader', value: true }))
    try {
      const api_update =
        next_cursor?.length > 0
          ? API_ENDPOINTS.COMMON.GET_ALL_CATEGORIES +
            `?cursor=${next_cursor}&isAdmin=true`
          : API_ENDPOINTS.COMMON.GET_ALL_CATEGORIES + '?isAdmin=true'
      await get(api_update).then((d) => {
        if (d?.message == 'CATEGORIES_FETCHED' && d?.success == true) {
          dispatch(setValue({ key: 'to_show_loader', value: false }))
          setState((prevs) => ({
            ...prevs,
            fetched_data: d?.data?.categories,
            total_pages: d?.data?.totalPages,
            next_cursor_id: d.data?.nextCursor,
            prev_cursor_id: d.data?.previousCursor
          }))
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
        // localStorageHelper.removeItem('login_data')
        // router.push(PAGES.LOGIN, { replace: true })
        console.log('logging out')
      }
    }
  }
  const fetch_itinerary = async (
    next_cursor = 0,
    total_count = null,
    hasFetchedAll = false
  ) => {
    dispatch(setValue({ key: 'to_show_loader', value: true }))

    try {
      const data = {
        isAdmin: true,
        limit: total_count || 0
      }
      const data2 = { isAdmin: true }

      await get(
        API_ENDPOINTS.COMMON.GET_ITINERARY,
        total_count != null ? data : data2
      ).then((d) => {
        if (d?.message === 'ITINERARIES_FETCHED' && d?.success === true) {
          dispatch(setValue({ key: 'to_show_loader', value: false }))

          setState((prevs) => ({
            ...prevs,
            total_itineraries: d?.data?.itineraries
          }))

          if (!hasFetchedAll && state.iti_fetch_count === 0) {
            console.log('Fetching all itineraries...')

            setState((prevs) => ({
              ...prevs,
              iti_fetch_count: prevs.iti_fetch_count + 1
            }))
            fetch_itinerary(null, d?.data?.totalCount, true)
          }
        }
      })
    } catch (error) {
      dispatch(setValue({ key: 'to_show_loader', value: false }))
      console.error(error)
      const err_response = error?.response?.data
      if (
        err_response.success === false &&
        err_response.message === 'VALIDATION_INVALID_TOKEN'
      ) {
        localStorageHelper.removeItem('login_data')
        router.push(PAGES.LOGIN, { replace: true })
      }
    }
  }
  const handleEditModalOpen = async ({ item }) => {
    fetch_itinerary().then(() => {
      setState((prevs) => ({
        ...prevs,
        // selected_category: item,
        cat_id: item?.id,
        to_which_modal_content: 'edit_cat',
        is_modalopen: true,
        cat_name: item?.name,
        cat_desc: item?.description,
        cat_short_desc: item?.short_description,
        cat_is_home: item?.is_home,
        feat_img: item?.image,
        banner_img: item?.banner_image,
        key1_name:
          item != null &&
          item?.keyPoints?.length > 0 &&
          item?.keyPoints?.[0]?.title,
        key1_img:
          item != null &&
          item?.keyPoints?.length > 0 &&
          item?.keyPoints?.[0]?.image,
        key2_name:
          item != null &&
          item?.keyPoints?.length > 0 &&
          item?.keyPoints?.[1]?.title,
        key2_img:
          item != null &&
          item?.keyPoints?.length > 0 &&
          item?.keyPoints?.[1]?.image,
        key3_name:
          item != null &&
          item?.keyPoints?.length > 0 &&
          item?.keyPoints?.[2]?.title,
        key3_img:
          item != null &&
          item?.keyPoints?.length > 0 &&
          item?.keyPoints?.[2]?.image,
        key4_name:
          item != null &&
          item?.keyPoints?.length > 0 &&
          item?.keyPoints?.[3]?.title,
        key4_img:
          item != null &&
          item?.keyPoints?.length > 0 &&
          item?.keyPoints?.[3]?.image,
        added_itineraries: item?.itinerary,
        keysarr: item?.keyPoints
      }))
    })
  }
  const handleAddNewCatOpen = () => {
    fetch_itinerary().then(() => {
      setState((prevs) => ({
        ...prevs,
        to_which_modal_content: 'add_new_cat',
        is_modalopen: true,
        cat_name: '',
        cat_desc: '',
        cat_short_desc: '',
        cat_is_home: false,
        feat_img: null,
        banner_img: null,
        key1_name: '',
        key1_img: null,
        key2_name: '',
        key2_img: null,
        key3_name: '',
        key3_img: null,
        key4_name: '',
        key4_img: null,
        added_itineraries: [],
        cat_id: 0
      }))
    })
  }
  const post_New_Category = async () => {
    dispatch(setValue({ key: 'to_show_loader', value: true }))
    try {
      const data_to_send = {
        name: state.cat_name,
        description: state.cat_desc,
        short_description: state.cat_short_desc,
        is_home: false,
        image: state.feat_img,
        banner_image: state.banner_img,
        keyPoints: [
          {
            title: state.key1_name,
            image: state.key1_img
          },
          {
            title: state.key2_name,
            image: state.key2_img
          },
          {
            title: state.key3_name,
            image: state.key3_img
          },
          {
            title: state.key4_name,
            image: state.key4_img
          }
        ],
        itineraries: [...state.added_itineraries]
      }
      console.log('logging every details', data_to_send)
      if (
        state.cat_name?.length == 0 ||
        state.cat_desc?.length == 0 ||
        state.cat_short_desc?.length == 0 ||
        state.feat_img == null ||
        // state.banner_img == null ||
        state.key1_img == null ||
        state.key1_name?.length == 0 ||
        state.key2_img == null ||
        state.key2_name?.length == 0 ||
        state.key3_img == null ||
        state.key3_name?.length == 0 ||
        state.key4_img == null ||
        state.key4_name?.length == 0
      ) {
        setState((prevs) => ({ ...prevs, to_show_error: true }))
        dispatch(setValue({ key: 'to_show_loader', value: false }))
        return
      }

      await post(API_ENDPOINTS.ADMIN.POST_NEW_CATEGORY, data_to_send).then(
        (d) => {
          if (d.message == 'CATEGORY_ADDED' && d.success == true) {
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
                  value: 'Category Added Successfully'
                })
              )
            fetch_All_Categories()
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
        router.push(PAGES.LOGIN, { replace: true })
      }
    }
  }
  const edit_New_Category = async () => {
    dispatch(setValue({ key: 'to_show_loader', value: true }))
    const updatedKeyPoints = [
      {
        ...state.keysarr[0],
        title: state.key1_name,
        image: state.key1_img
      },
      {
        ...state.keysarr[1],
        title: state.key2_name,
        image: state.key2_img
      },
      {
        ...state.keysarr[2],
        title: state.key3_name,
        image: state.key3_img
      },
      {
        ...state.keysarr[3],
        title: state.key4_name,
        image: state.key4_img
      }
    ]
    const newItiData =
      state.added_itineraries?.length > 0
        ? state.added_itineraries?.map((item, index) => item?.id)
        : []
    try {
      const data_to_send = {
        name: state.cat_name,
        description: state.cat_desc,
        short_description: state.cat_short_desc,
        is_home: false,
        image: state.feat_img,
        banner_image: state.banner_img,
        keyPoints: updatedKeyPoints,
        itineraries: newItiData
      }
      console.log('logging every details', data_to_send)
      if (
        state.cat_name?.length == 0 ||
        state.cat_desc?.length == 0 ||
        state.cat_short_desc?.length == 0 ||
        state.feat_img == null ||
        // state.banner_img == null ||
        state.key1_img == null ||
        state.key1_name?.length == 0 ||
        state.key2_img == null ||
        state.key2_name?.length == 0 ||
        state.key3_img == null ||
        state.key3_name?.length == 0 ||
        state.key4_img == null ||
        state.key4_name?.length == 0
      ) {
        setState((prevs) => ({ ...prevs, to_show_error: true }))
        dispatch(setValue({ key: 'to_show_loader', value: false }))
        return
      }
      await put(
        API_ENDPOINTS.ADMIN.POST_NEW_CATEGORY + `/${state.cat_id}`,
        data_to_send
      ).then((d) => {
        if (d.message == 'CATEGORY_UPDATED' && d.success == true) {
          dispatch(setValue({ key: 'to_show_loader', value: false }))
          setState((prevs) => ({ ...prevs, is_modalopen: false }))
          dispatch(
            setValue({
              key: 'to_show_alert',
              value: true
            })
          ),
            dispatch(
              setValue({
                key: 'alert_content',
                value: 'Category Updated Successfully'
              })
            )
          fetch_All_Categories()
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
        router.push(PAGES.LOGIN, { replace: true })
      }
    }
  }
  const delete_Cat = async ({ id }) => {
    const isConfirmed = await showConfirmationDialog(dispatch)
    if (isConfirmed) {
      dispatch(setValue({ key: 'to_show_loader', value: true }))
      try {
        await remove(API_ENDPOINTS.ADMIN.POST_NEW_CATEGORY + `/${id}`).then(
          (d) => {
            if (d.message == 'CATEGORY_DELETED' && d.success == true) {
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
                    value: 'Category Deleted'
                  })
                ),
                fetch_All_Content_Data()
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
          router.push(PAGES.LOGIN, { replace: true })
        }
      }
    }
  }
  const update_Category_Order = async () => {
    dispatch(setValue({ key: 'to_show_loader', value: true }))
    try {
      const data_to_send = {
        categories: state.updated_data
      }
      console.log('logging every details', data_to_send)
      if (state.updated_data?.length == 0) {
        dispatch(
          setValue({
            key: 'to_show_alert',
            value: true
          })
        )
        dispatch(
          setValue({
            key: 'alert_content',
            value: 'Please Change the order first!'
          })
        )
        dispatch(setValue({ key: 'alert_type', value: 'warning' }))
        dispatch(setValue({ key: 'to_show_loader', value: false }))
        return
      }
      await put(API_ENDPOINTS.ADMIN.UPDATE_CATEGORY_ORDER, data_to_send).then(
        (d) => {
          if (d.message == 'CATEGORY_ORDER_UPDATED' && d.success == true) {
            dispatch(setValue({ key: 'to_show_loader', value: false }))
            dispatch(setValue({ key: 'alert_type', value: 'success' }))
            dispatch(
              setValue({
                key: 'to_show_alert',
                value: true
              })
            ),
              dispatch(
                setValue({
                  key: 'alert_content',
                  value: 'Category Order Updated Successfully'
                })
              )
            fetch_All_Categories()
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
        router.push(PAGES.LOGIN, { replace: true })
      }
    }
  }
  const onDragEnd = (result) => {
    const { source, destination } = result
    const reorderedData = [...state.fetched_data]
    const [movedItem] = reorderedData.splice(source.index, 1)
    reorderedData.splice(destination.index, 0, movedItem)
    const categoryIds = reorderedData
      .flatMap((item) => item?.id || [])
      .filter(Boolean)
    console.log('logging data', categoryIds)
    setState((prevs) => ({
      ...prevs,
      fetched_data: reorderedData,
      updated_data: categoryIds
    }))
  }
  useEffect(() => {
    fetch_All_Categories()
  }, [])

  return (
    <div className=" h-screen w-full flex  bg-white">
      <div className="w-full bg-white p-16 rounded-2xl animate-fadeIn ml-0 sm:ml-60 ">
        <AdminTopbar topbar_title={'Category'} />
        <div className="flex flex-wrap justify-between mt-10">
          <CustomText
            secondaryfontweight
            fontsize="16px"
            content={'List of Categories'}
            className="text-black"
          />
          <div className="flex gap-4">
            <div className="  ">
              <CustomButton
                content={'Update Category List'}
                btncolor={light.signinbtnbackground}
                onClick={() => update_Category_Order()}
              />
            </div>
            <div className="  justify-center items-center">
              <CustomButton
                logo_path={
                  <div className="mr-3">
                    <AddIcon />
                  </div>
                }
                content={'Add New Category'}
                btncolor={light.signinbtnbackground}
                onClick={() => handleAddNewCatOpen()}
              />
            </div>
          </div>
        </div>
        <div className=" mt-3">
          <table className="min-w-full border-collapse text-center  ">
            <thead className="bg-inputbg rounded-full p-5">
              <tr className="grid grid-cols-5 gap-4">
                <th className="rounded-l-lg px-4 py-2 pl-16 text-start ">
                  <CustomText
                    content={'Category Name'}
                    fontsize="13px"
                    secondaryfontweight
                  />
                </th>
                <th className="px-4 py-2 pl-10 text-center">
                  <CustomText
                    content={'No. of Itineraries'}
                    fontsize="13px"
                    secondaryfontweight
                  />
                </th>
                <th className="px-4 py-2 text-center">
                  <CustomText
                    content={'Status'}
                    fontsize="13px"
                    secondaryfontweight
                  />
                </th>
                <th className="px-4 py-2 text-center"></th>
                <th className="rounded-r-lg px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="w-auto">
              {state.fetched_data?.length > 0 ? (
                <Box>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="inputList">
                      {(provided) => (
                        <List
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {state.fetched_data.map((item, index) => (
                            <Draggable
                              key={index}
                              draggableId={`${index}`}
                              index={index}
                            >
                              {(provided) => (
                                <ListItem
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{
                                    flexDirection: 'column',
                                    mb: 1,
                                    border: '1px solid #ccc',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    userSelect: 'none'
                                  }}
                                >
                                  <React.Fragment key={item?.id || index}>
                                    <tr>
                                      <td colSpan="100%" className="">
                                        <CustomAccordion
                                          item={item}
                                          index={index}
                                          state={state}
                                          setState={setState}
                                          handleEditModalOpen={
                                            handleEditModalOpen
                                          }
                                          delete_Cat={delete_Cat}
                                          content={
                                            <div className="">
                                              {(item?.itinerary || [])?.map(
                                                (itinerary, idx) => (
                                                  <div
                                                    key={idx}
                                                    className="grid grid-cols-5 gap-4"
                                                  >
                                                    <div className="px-4 py-2 text-center w-full">
                                                      <CustomText
                                                        content={
                                                          idx +
                                                            1 +
                                                            '. ' +
                                                            itinerary?.title ||
                                                          'NA'
                                                        }
                                                        fontsize="13px"
                                                        secondaryfontweight
                                                      />
                                                    </div>
                                                    <div className="px-4 py-2 text-center w-full">
                                                      <CustomText
                                                        content={'-'}
                                                        fontsize="13px"
                                                        secondaryfontweight
                                                      />
                                                    </div>
                                                    <div className="px-4 py-2 text-center w-full">
                                                      <div
                                                        className={`${
                                                          (itinerary?.is_active ||
                                                            false) == true
                                                            ? 'bg-btnactivecolor'
                                                            : 'bg-btninactivecolor'
                                                        } rounded-2xl mx-[2.74rem] p-[3.5px]`}
                                                      >
                                                        <CustomText
                                                          content={
                                                            itinerary?.is_active
                                                              ? 'Active'
                                                              : 'Inactive' ||
                                                                'Inactive'
                                                          }
                                                          fontsize="13px"
                                                          secondaryfontweight
                                                          className="text-white"
                                                        />
                                                      </div>
                                                    </div>
                                                    {/* <td className="px-4  w-2 mx-auto ">
                                      <CustomButton
                                        className="ml-3"
                                        logo_path={<EditIcon />}
                                        content={''}
                                        small_btn
                                      />
                                    </td>
                                    <td className="group relative px-4 w-2 mx-auto">
                                      <CustomButton
                                        logo_path={<ThreedotIcon />}
                                        content={''}
                                        small_btn
                                      />
                                      <div className="group-hover:block hidden absolute top-5 right-5 bg-white z-20 shadow-2xl shadow-[rgba(0, 0, 0, 0.25)] rounded-lg p-5 px-6 text-start">
                                        <div
                                          onClick={() =>
                                            setState((prevs) => ({
                                              ...prevs,
                                              selected_category: item,
                                              to_which_modal_content:
                                                'view_cat',
                                              is_modalopen: true
                                            }))
                                          }
                                          className="mb-2 cursor-pointer transition-transform transform duration-75 active:scale-95 select-none"
                                        >
                                          View Category
                                        </div>
                                        <div className="mb-2 cursor-pointer transition-transform transform duration-75 active:scale-95 select-none">
                                          Inactive
                                        </div>
                                        <div className="text-deletetextcolor cursor-pointer transition-transform transform duration-75 active:scale-95 select-none">
                                          Delete
                                        </div>
                                      </div>
                                    </td> */}
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan="100%" className="p-0">
                                        <hr className="w-full my-1 bg-bordercolor" />
                                      </td>
                                    </tr>
                                  </React.Fragment>
                                </ListItem>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </List>
                      )}
                    </Droppable>
                  </DragDropContext>
                </Box>
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* <div className="flex justify-end ">
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
                  fetch_All_Categories(state.prev_cursor_id)
                }
              }}
              onClick={(e) => {
                if (
                  state.current_page != e &&
                  state.next_cursor_id?.length > 0 &&
                  state.current_page + 1 == e
                ) {
                  setState((prevs) => ({ ...prevs, current_page: e }))
                  fetch_All_Categories(state.next_cursor_id)
                } else if (
                  state.current_page != e &&
                  state.prev_cursor_id?.length > 0 &&
                  state.current_page - 1 == e
                ) {
                  setState((prevs) => ({ ...prevs, current_page: e }))
                  fetch_All_Categories(state.prev_cursor_id)
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
                  fetch_All_Categories(state.next_cursor_id)
                }
              }}
            />
          </div> */}
        </div>
        <CustomModal
          open={state.is_modalopen}
          handleClose={() =>
            setState((prevs) => ({ ...prevs, is_modalopen: false }))
          }
          title={
            state.to_which_modal_content == 'add_new_cat' ? (
              <span>
                <strong>Add new </strong>
                Category
              </span>
            ) : state.to_which_modal_content == 'view_cat' ? (
              <span></span>
            ) : (
              <span>
                Editing this
                <strong>{' ' + state.cat_name} </strong>
              </span>
            )
          }
          description={
            state.to_which_modal_content == 'add_new_cat'
              ? 'Create a new category by filling out details including destinations, dates, transportation, and activities.'
              : ''
          }
          restContent={
            state.to_which_modal_content == 'view_cat' ? (
              <div className=" w-full">
                <div className="text-start ">
                  <div>
                    <CustomText
                      fontsize="34.94px"
                      primaryfontweight
                      content={
                        <span>
                          <strong>{state.selected_category?.name}</strong>
                          {' trip'}
                        </span>
                      }
                      className="mb-4"
                    />
                  </div>
                  <CustomText
                    fontsize="18px"
                    content={state.selected_category?.short_description}
                  />
                </div>
                <div className="flex  ">
                  <img
                    src={state.selected_category?.image}
                    alt="cat_img"
                    width="410px"
                    className="rounded-2xl mt-4 aspect-video"
                  />
                  <div className="mt-2 ml-2">
                    <div className="text-start">
                      <CustomText
                        content={'Listed Itineraries'}
                        fontsize="12px"
                      />
                    </div>
                    <div className="border-2 border-[rgba(110, 118, 132, 0.33)] p-2 rounded-md mt-4 max-h-[300px] overflow-y-scroll">
                      {(state?.selected_category?.itinerary || [])?.map(
                        (item, index) => (
                          <div className="mb-2 flex items-center gap-2 border-2 border-[rgba(110, 118, 132, 0.33)] p-2 rounded-md">
                            <div
                              style={{
                                height: '25px',
                                minWidth: '25px',
                                borderRadius: '50%',
                                backgroundColor:
                                  item?.is_active == true
                                    ? '#4DFF5F'
                                    : '#FF4D4D'
                              }}
                            />
                            <CustomText
                              content={item?.title}
                              fontsize="10.91px"
                            />
                            <div className="flex justify-center items-center">
                              <SlCalender
                                size={30}
                                color="black"
                                className="mr-2 ml-4"
                              />
                              <CustomText
                                content={`${item?.duration} Days & ${
                                  item?.duration - 1
                                }  Nights`}
                                fontsize="10.91px"
                              />
                            </div>
                            <div className="w-[1px] bg-[#6E7684] self-stretch mx-5 my-3" />
                            <div className="flex justify-center items-center">
                              <FiMapPin
                                size={10}
                                color="black"
                                className="mr-1"
                              />
                              <CustomText
                                content={item?.city}
                                fontsize="10.91px"
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-start mt-4">
                  <CustomText
                    fontsize="12.26px"
                    content={state?.selected_category?.description}
                  />
                  <CustomText
                    content={'Key Points with Images'}
                    fontsize="19px"
                    className="mt-4"
                  />
                </div>
                <div className="flex gap-4 ">
                  {(state?.selected_category?.keyPoints || [])?.map(
                    (key_item, key_index) => (
                      <div className="mt-4">
                        <div className="text-start">
                          <CustomText
                            content={key_index + 1 + '. ' + key_item?.title}
                          />
                        </div>
                        <img
                          src={key_item?.image}
                          alt="keypoints_img"
                          width="180px"
                          className="rounded-2xl mt-1 aspect-video"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex mt-4 w-full gap-4">
                  <div className="w-full">
                    <CustomInput
                      top_title="Category Name"
                      backgroundColor="white"
                      content="Enter name of Itinerary"
                      value={state.cat_name}
                      onchange={(e) =>
                        setState((prevs) => ({
                          ...prevs,
                          cat_name: e.target.value
                        }))
                      }
                      error_text={
                        state.to_show_error &&
                        state.cat_name?.length == 0 &&
                        'Enter the name to continue'
                      }
                    />
                  </div>
                  <div className="w-full">
                    <CustomInput
                      top_title="Short Description"
                      backgroundColor="white"
                      content="Enter short description"
                      value={state.cat_short_desc}
                      onchange={(e) =>
                        setState((prevs) => ({
                          ...prevs,
                          cat_short_desc: e.target.value
                        }))
                      }
                      error_text={
                        state.to_show_error &&
                        state.cat_short_desc?.length == 0 &&
                        'Enter the short description to continue'
                      }
                    />
                  </div>
                </div>
                <div className="w-full mt-4">
                  <CustomInput
                    top_title="Long Description"
                    backgroundColor="white"
                    content="Enter long description"
                    value={state.cat_desc}
                    onchange={(e) =>
                      setState((prevs) => ({
                        ...prevs,
                        cat_desc: e.target.value
                      }))
                    }
                    error_text={
                      state.to_show_error &&
                      state.cat_desc?.length == 0 &&
                      'Enter the description to continue'
                    }
                  />
                </div>
                <div className="flex gap-4">
                  <div className="">
                    <CustomInputFile
                      btncontent="Browse..."
                      second_title_btn="Or drop Feature Image here"
                      top_title_content="Feature Image : "
                      className={'mt-4'}
                      no_right_margin={true}
                      small_btn={true}
                      state={state.feat_img}
                      inputId="featimg_input"
                      setstate={(feat) =>
                        setState((prevs) => ({ ...prevs, feat_img: feat }))
                      }
                    />
                    {state.to_show_error && state.feat_img == null && (
                      <div className="flex justify-start my-2">
                        <CustomText
                          content={'Please upload the image to continue'}
                          className="text-red-500"
                          fontsize="12px"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <CustomInputFile
                      btncontent="Browse..."
                      second_title_btn="Or drop Banner Image here"
                      top_title_content="Banner Image :  "
                      className={'mt-4'}
                      no_right_margin={true}
                      small_btn={true}
                      state={state.banner_img}
                      inputId="bannerimg_input"
                      setstate={(banner) => {
                        setState((prevs) => ({
                          ...prevs,
                          banner_img: banner
                        }))
                      }}
                    />
                    {/* {state.to_show_error && state.banner_img == null && (
                      <div className="flex justify-start my-2">
                        <CustomText
                          content={'Please upload the image to continue'}
                          className="text-red-500"
                          fontsize="12px"
                        />
                      </div>
                    )} */}
                  </div>
                  {/* <div className="mt-6">
                    <CustomText
                      content={'Only Home'}
                      fontsize="16.05px"
                      className="text-nowrap"
                    />
                    <Switch
                      value={state.cat_is_home}
                      size="medium"
                      onChange={(e) => {
                        setState((prevs) => ({
                          ...prevs,
                          cat_is_home: e.target.checked
                        }))
                        console.log('logging state change ', e.target.checked)
                      }}
                    />
                  </div> */}
                </div>

                <div className="flex justify-center ">
                  {state?.total_itineraries?.length > 0 && (
                    <div className="mt-4 ml-2">
                      <div className="text-start">
                        <CustomText
                          content={'Total Itineraries'}
                          primaryfontweight
                          fontsize="12px"
                        />
                      </div>
                      <div className="border-2 border-[rgba(110, 118, 132, 0.33)] p-2 rounded-md mt-4 max-h-[300px] overflow-y-scroll">
                        {(state?.total_itineraries || [])?.map(
                          (item, index) => (
                            <div className=" group mb-2 flex items-center gap-2 rounded-md w-full">
                              <div className="relative flex w-full rounded-md group-hover:bg-gradient-to-r group-hover:from-[#FCFCFC] group-hover:to-[#00B69B]  border-2 border-[rgba(110, 118, 132, 0.33)] p-2 ">
                                <div
                                  onClick={() => {
                                    const item_check =
                                      state?.added_itineraries.some(
                                        (ad_item) => ad_item.id == item.id
                                      )
                                    if (item_check == false) {
                                      setState((prevs) => ({
                                        ...prevs,
                                        added_itineraries: [
                                          ...prevs.added_itineraries,
                                          item
                                        ]
                                      }))
                                    }
                                  }}
                                  className="hidden absolute right-[6%] top-[34%] group-hover:flex z-10"
                                >
                                  <CustomText
                                    content={'Add'}
                                    className="text-white select-none cursor-pointer transition-transform transform duration-75 active:scale-95"
                                  />
                                </div>
                                <div
                                  style={{
                                    height: '25px',
                                    minWidth: '25px',
                                    borderRadius: '50%',
                                    marginRight: '10px',
                                    backgroundColor:
                                      item?.is_active == true
                                        ? '#4DFF5F'
                                        : '#FF4D4D'
                                  }}
                                />
                                <CustomText
                                  content={item?.title}
                                  fontsize="10.91px"
                                />
                                <div className="flex justify-center items-center">
                                  <SlCalender
                                    size={15}
                                    color="black"
                                    className="mr-2 ml-4"
                                  />
                                  <CustomText
                                    content={`${item?.duration} Days & ${
                                      item?.duration - 1
                                    }  Nights`}
                                    fontsize="10.91px"
                                  />
                                </div>
                                <div
                                  className={`w-[1px] bg-[#6E7684] self-stretch mx-5 ${
                                    state.added_itineraries?.length > 0
                                      ? 'my-3'
                                      : 'my-1'
                                  } `}
                                />
                                <div className="flex justify-center items-center">
                                  <FiMapPin
                                    size={10}
                                    color="black"
                                    className="mr-1"
                                  />
                                  <CustomText
                                    content={item?.city}
                                    fontsize="10.91px"
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  {state.added_itineraries?.length > 0 && (
                    <div className="flex items-center">
                      <CgArrowsExchangeAlt size={30} color="black" />
                    </div>
                  )}
                  {state.added_itineraries?.length > 0 && (
                    <div className="mt-4 ml-2">
                      <div className="text-start">
                        <CustomText
                          content={'Added Itineraries'}
                          primaryfontweight
                          fontsize="12px"
                        />
                      </div>
                      <div className="border-2 border-[rgba(110, 118, 132, 0.33)] p-2 rounded-md mt-4 max-h-[300px] overflow-y-scroll">
                        {(state?.added_itineraries || [])?.map(
                          (item, index) => (
                            <div className="group mb-2 flex items-center gap-2 rounded-md w-full">
                              <div className="relative w-full flex rounded-md group-hover:bg-gradient-to-r group-hover:from-[#FCFCFC] group-hover:to-[#E96042]  border-2 border-[rgba(110, 118, 132, 0.33)] p-2 ">
                                <div
                                  onClick={() =>
                                    setState((prevs) => ({
                                      ...prevs,
                                      added_itineraries:
                                        prevs.added_itineraries.filter(
                                          (it) => it?.id != item?.id
                                        )
                                    }))
                                  }
                                  className="hidden absolute right-[6%] top-[34%] group-hover:flex z-10"
                                >
                                  <CustomText
                                    content={'Remove'}
                                    className="text-white select-none cursor-pointer transition-transform transform duration-75 active:scale-95"
                                  />
                                </div>

                                <div
                                  style={{
                                    height: '25px',
                                    minWidth: '25px',
                                    borderRadius: '50%',
                                    backgroundColor:
                                      item?.is_active == true
                                        ? '#4DFF5F'
                                        : '#FF4D4D'
                                  }}
                                />
                                <CustomText
                                  content={item?.title}
                                  fontsize="10.91px"
                                />
                                <div className="flex justify-center items-center">
                                  <SlCalender
                                    size={30}
                                    color="black"
                                    className="mr-2 ml-4"
                                  />
                                  <CustomText
                                    content={`${item?.duration} Days & ${
                                      item?.duration - 1
                                    }  Nights`}
                                    fontsize="10.91px"
                                  />
                                </div>
                                <div
                                  className={`w-[1px] bg-[#6E7684] self-stretch mx-5 ${
                                    state.added_itineraries?.length > 0
                                      ? 'my-3'
                                      : 'my-1'
                                  }`}
                                />
                                <div className="flex justify-center items-center">
                                  <FiMapPin
                                    size={10}
                                    color="black"
                                    className="mr-1"
                                  />
                                  <CustomText
                                    content={item?.city}
                                    fontsize="10.91px"
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* {state.to_show_error &&
                  state.added_itineraries?.length == 0 && (
                    <div className="flex justify-start my-2">
                      <CustomText
                        content={'Please add a itinerary to continue'}
                        className="text-red-500"
                        fontsize="12px"
                      />
                    </div>
                  )} */}

                <div>
                  <div className="text-center my-4">
                    <CustomText
                      content={'Key Points with Images'}
                      primaryfontweight
                      fontsize="14.26px"
                    />
                  </div>
                  <div className="flex">
                    <div>
                      <div className="flex ">
                        <CustomText content={'1.'} className="mt-12 mr-2" />
                        <div className="w-full">
                          <CustomInput
                            top_title="Title"
                            backgroundColor="white"
                            content="Enter first key point"
                            custompadding="p-4"
                            value={state.key1_name}
                            onchange={(e) =>
                              setState((prevs) => ({
                                ...prevs,
                                key1_name: e.target.value
                              }))
                            }
                            error_text={
                              state.to_show_error &&
                              state.key1_name?.length == 0 &&
                              'Enter the key 1 point to continue'
                            }
                          />
                        </div>
                      </div>
                      <div className="flex mt-4">
                        <CustomText content={'2.'} className="mt-5 mr-2" />
                        <div className="w-full">
                          <CustomInput
                            backgroundColor="white"
                            content="Enter second key point"
                            custompadding="p-4"
                            value={state.key2_name}
                            onchange={(e) =>
                              setState((prevs) => ({
                                ...prevs,
                                key2_name: e.target.value
                              }))
                            }
                            error_text={
                              state.to_show_error &&
                              state.key2_name?.length == 0 &&
                              'Enter the key 2 point to continue'
                            }
                          />
                        </div>
                      </div>
                      <div className="flex mt-4">
                        <CustomText content={'3.'} className="mt-4 mr-2" />
                        <div className="w-full">
                          <CustomInput
                            backgroundColor="white"
                            content="Enter third key point"
                            custompadding="p-4"
                            value={state.key3_name}
                            onchange={(e) =>
                              setState((prevs) => ({
                                ...prevs,
                                key3_name: e.target.value
                              }))
                            }
                            error_text={
                              state.to_show_error &&
                              state.key3_name?.length == 0 &&
                              'Enter the key 3 point to continue'
                            }
                          />
                        </div>
                      </div>
                      <div className="flex mt-4">
                        <CustomText content={'4.'} className="mt-5 mr-2" />
                        <div className="w-full">
                          <CustomInput
                            backgroundColor="white"
                            content="Enter fourth key point"
                            custompadding="p-4"
                            value={state.key4_name}
                            onchange={(e) =>
                              setState((prevs) => ({
                                ...prevs,
                                key4_name: e.target.value
                              }))
                            }
                            error_text={
                              state.to_show_error &&
                              state.key4_name?.length == 0 &&
                              'Enter the key 4 point to continue'
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex ">
                        <div className="w-full">
                          <CustomInputFile
                            btncontent="Browse..."
                            second_title_btn="Or drop Image here"
                            top_title_content="Images"
                            // className={'mt-6'}
                            no_right_margin={true}
                            small_btn={true}
                            state={state.key1_img}
                            inputId="key1img_input"
                            setstate={(e) =>
                              setState((prevs) => ({ ...prevs, key1_img: e }))
                            }
                          />
                          {state.to_show_error && state.key1_img == null && (
                            <div className="flex justify-start my-2">
                              <CustomText
                                content={
                                  'Please upload the key 1 image to continue'
                                }
                                className="text-red-500"
                                fontsize="12px"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex mt-4">
                        <div className="w-full">
                          <CustomInputFile
                            btncontent="Browse..."
                            second_title_btn="Or drop Image here"
                            // className={'mt-6'}
                            no_right_margin={true}
                            small_btn={true}
                            no_title={false}
                            state={state.key2_img}
                            inputId="key2img_input"
                            setstate={(e) =>
                              setState((prevs) => ({ ...prevs, key2_img: e }))
                            }
                          />
                          {state.to_show_error && state.key2_img == null && (
                            <div className="flex justify-start my-2">
                              <CustomText
                                content={
                                  'Please upload the key 1 image to continue'
                                }
                                className="text-red-500"
                                fontsize="12px"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex mt-4">
                        <div className="w-full">
                          <CustomInputFile
                            btncontent="Browse..."
                            second_title_btn="Or drop Image here"
                            // className={'mt-6'}
                            no_right_margin={true}
                            small_btn={true}
                            no_title={false}
                            state={state.key3_img}
                            inputId="key3img_input"
                            setstate={(e) =>
                              setState((prevs) => ({ ...prevs, key3_img: e }))
                            }
                          />
                          {state.to_show_error && state.key3_img == null && (
                            <div className="flex justify-start my-2">
                              <CustomText
                                content={
                                  'Please upload the key 1 image to continue'
                                }
                                className="text-red-500"
                                fontsize="12px"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex mt-4">
                        <div className="w-full">
                          <CustomInputFile
                            btncontent="Browse..."
                            second_title_btn="Or drop Image here"
                            // className={'mt-6'}
                            no_right_margin={true}
                            small_btn={true}
                            no_title={false}
                            state={state.key4_img}
                            inputId="key4img_input"
                            setstate={(e) =>
                              setState((prevs) => ({ ...prevs, key4_img: e }))
                            }
                          />
                          {state.to_show_error && state.key4_img == null && (
                            <div className="flex justify-start my-2">
                              <CustomText
                                content={
                                  'Please upload the key 1 image to continue'
                                }
                                className="text-red-500"
                                fontsize="12px"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-44 mt-6">
                  <CustomButton
                    content={
                      state.to_which_modal_content == 'add_new_cat'
                        ? 'Finish'
                        : state.to_which_modal_content == 'edit_cat' &&
                          'Finish Editing'
                    }
                    btncolor={light.signinbtnbackground}
                    pill_rounded
                    md_round={false}
                    onClick={() =>
                      state.to_which_modal_content == 'add_new_cat'
                        ? post_New_Category()
                        : edit_New_Category()
                    }
                  />
                </div>
              </div>
            )
          }
        />
      </div>
    </div>
  )
}

export default Category
