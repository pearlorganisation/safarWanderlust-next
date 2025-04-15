"use client";

import React, { useEffect } from "react";
import CustomModal from "./CustomModal";
import CustomInput from "./CustomInput";
import CustomMultiItiSelect from "./CustomMultiItiSelect";
import CustomText from "./CustomText";
import { Box, IconButton } from "@mui/material";
import { FaPlus, FaMinus } from "react-icons/fa";
import DraggableInputList from "./DraggableInputList";
import DraggableHotelList from "./DraggableHotelList";
import PackageComp from "./PackageComp";
import CustomButton from "./CustomButton";
// import { setValue } from '@lib/globalSlice'
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { get, post, put } from "../constants/axiosClient";
import { localStorageHelper } from "../helper/storageHelper";
import { PAGES } from "../constants/PagesName";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import InfiniteInputBox from "./InfiniteInputBox";
import moment from "moment-timezone";
import {
  CLOUD_NAME,
  UPLOAD_PRESET_NAME,
} from "../constants/CloudinaryConstants";
import { setValue } from "@/lib/globalSlice";

function AddNewItiComp({
  state,
  setState,
  dayintro,
  setdayintro,
  hotelinfo,
  sethotelinfo,
  packagedetails,
  setpackagedetails,
  fetch_iti = () => {},
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const getAllCategories = async () => {
    dispatch(setValue({ key: "to_show_loader", value: true }));
    try {
      await get(API_ENDPOINTS.COMMON.GET_ALL_CATEGORIES).then((d) => {
        if (d.message == "CATEGORIES_FETCHED" && d.success == true) {
          dispatch(setValue({ key: "to_show_loader", value: false }));
          setState((prevs) => ({
            ...prevs,
            categories_data: d?.data?.categories,
            categories_list: d?.data?.categories?.map(
              (category) => category?.name
            ),
          }));
          console.log(
            "logging data from cat list",
            d?.data?.categories?.map((category) => category?.name)
          );
        }
      });
    } catch (error) {
      dispatch(setValue({ key: "to_show_loader", value: false }));
      console.error(error);
      const err_response = error?.response?.data;
      if (
        err_response.success == false &&
        err_response.message == "VALIDATION_INVALID_TOKEN"
      ) {
        localStorageHelper.removeItem("login_data");
        router.push(PAGES.LOGIN, { replace: true });
      }
    }
  };
  const compressImage = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(imageFile);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 800;
        const scaleSize = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          0.7
        );
      };

      img.onerror = (error) => reject(error);
    });
  };
  const handleUpload = async (fileIndex) => {
    const selectedImage = state.iti_img[fileIndex];

    // Check if the selected item is already a URL or if it's an empty string
    if (typeof selectedImage === "string" && selectedImage) {
      console.log(`Image already uploaded: ${selectedImage}`);
      return; // Skip if it's already uploaded
    }

    // Proceed with upload only if it's a File object
    if (!selectedImage || selectedImage === "") {
      console.error(`No file selected at index ${fileIndex}`);
      return; // Skip if no file is selected
    }

    const compressedImageBlob = await compressImage(selectedImage);
    const compressedImageFile = new File(
      [compressedImageBlob],
      selectedImage.name,
      { type: "image/jpeg" }
    );
    console.log(`Uploading image at index ${fileIndex}:`, selectedImage);

    const formData = new FormData();
    formData.append("file", compressedImageFile); // Make sure selectedImage is indeed a File object
    formData.append("upload_preset", UPLOAD_PRESET_NAME);

    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        // Update the specific index with the newly uploaded image URL
        const updatedimgs = [...state.iti_img];
        updatedimgs[fileIndex] = data.secure_url; // Store the URL
        setState((prevState) => ({ ...prevState, iti_img: updatedimgs }));
      })
      .catch((error) => {
        console.error("Upload failed", error);
      });
  };
  const handleUpload22 = async (fileIndex, localSelectedImages) => {
    const selectedImage = localSelectedImages[fileIndex]; // Fetch from local variable

    // Check if the selected item is already a URL or an empty string
    if (typeof selectedImage === "string" && selectedImage) {
      console.log(`Image already uploaded: ${selectedImage}`);
      return; // Skip if it's already uploaded
    }

    // Check if the selected image is a valid File object
    if (!selectedImage || selectedImage === "") {
      console.error(`No valid file selected at index ${fileIndex}`);
      return;
    }
    const compressedImageBlob = await compressImage(selectedImage);
    const compressedImageFile = new File(
      [compressedImageBlob],
      selectedImage.name,
      { type: "image/jpeg" }
    );
    console.log(`Uploading image at index ${fileIndex}:`, compressedImageFile);

    const formData = new FormData();
    formData.append("file", compressedImageFile);
    formData.append("upload_preset", UPLOAD_PRESET_NAME);

    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        // Update the specific index in the local variable with the newly uploaded image URL
        localSelectedImages[fileIndex] = data.secure_url; // Store the URL locally

        // After upload, update the state with the new image array
        setState((prevState) => ({
          ...prevState,
          iti_img: localSelectedImages,
        }));

        console.log(`Image uploaded successfully: ${data.secure_url}`);
      })
      .catch((error) => {
        console.error("Upload failed", error);
      });
  };
  const handleFileInputChange = (fileIndex, file) => {
    const updatedimgs = [...state.iti_img];
    updatedimgs[fileIndex] = file;
    setState((prevs) => ({ ...prevs, iti_img: updatedimgs }));
    let localSelectedImages = [...state.iti_img];
    localSelectedImages[fileIndex] = file;

    handleUpload22(fileIndex, localSelectedImages);
  };
  const handleImageChange = (fileIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileInputChange(fileIndex, file);
    }
  };
  const removeFileInput = (fileIndex) => {
    setState((prevState) => ({
      ...prevState,
      iti_img: prevState.iti_img.filter((_, index) => index !== fileIndex),
    }));
  };
  const addFileInput = (index) => {
    setState((prevState) => ({
      ...prevState,
      iti_img: [...prevState.iti_img, ""],
    }));
  };
  const validateDayIntro = (dayintros) => {
    for (let dayintro of dayintros) {
      if (!dayintro.day || dayintro.day <= 0) {
        return false;
      }

      if (!dayintro.title || dayintro.title.trim() === "") {
        return false;
      }

      if (!dayintro.description || dayintro.description.trim() === "") {
        return false;
      }

      //   if (!Array.isArray(dayintro.places) || dayintro.places.length === 0) {
      //     return false
      //   }

      // for (let place of dayintro.places) {
      //   if (!place || place.trim() === '') {
      //     return false
      //   }
      // }

      // if (
      //   !Array.isArray(dayintro.activiteis) ||
      //   dayintro.activiteis.length === 0
      // ) {
      //   return false
      // }

      // for (let activity of dayintro.activiteis) {
      //   if (!activity.description || activity.description.trim() === '') {
      //     return false
      //   }

      //   for (let image of activity.images) {
      //     if (!image || image.trim() === '') {
      //       return false
      //     }
      //   }
      // }
    }

    return true;
  };
  const validateHotels = (hotels) => {
    // for (let i = 0; i < hotels.length; i++) {
    //   const hotel = hotels[i]
    //   if (!hotel.name || hotel.name.trim() === '') {
    //     return false
    //   }

    //   if (
    //     typeof hotel.rating !== 'number' ||
    //     hotel.rating <= 0 ||
    //     hotel.rating > 5
    //   ) {
    //     return false
    //   }
    //   if (
    //     !Array.isArray(hotel.images) ||
    //     hotel.images.length === 0 ||
    //     hotel.images.some((image) => image.trim() === '')
    //   ) {
    //     return false
    //   }

    //   if (!hotel.reference || hotel.reference.trim() === '') {
    //     return false
    //   }
    // }

    return true;
  };
  const validatePackages = (packages) => {
    for (let i = 0; i < packages.base_packages.length; i++) {
      const basePackage = packages.base_packages[i];

      if (!basePackage.name || basePackage.name.trim() === "") {
        return false;
      }

      if (
        !basePackage.original_price ||
        isNaN(basePackage.original_price) ||
        Number(basePackage.original_price) <= 0
      ) {
        return false;
      }

      if (
        !basePackage.discounted_price ||
        isNaN(basePackage.discounted_price) ||
        Number(basePackage.discounted_price) <= 0
      ) {
        return false;
      }
    }

    for (let i = 0; i < packages.pickup_point.length; i++) {
      const pickup = packages.pickup_point[i];

      if (!pickup.name || pickup.name.trim() === "") {
        return false;
      }

      if (isNaN(pickup.price) || Number(pickup.price) < 0) {
        return false;
      }
    }

    for (let i = 0; i < packages.drop_point.length; i++) {
      const drop = packages.drop_point[i];

      if (!drop.name || drop.name.trim() === "") {
        return false;
      }

      if (isNaN(drop.price) || Number(drop.price) < 0) {
        return false;
      }
    }

    for (let i = 0; i < packages.batches.length; i++) {
      const batch = packages.batches[i];

      if (!batch.start_date || isNaN(Date.parse(batch.start_date))) {
        return false;
      }

      if (!batch.end_date || isNaN(Date.parse(batch.end_date))) {
        return false;
      }

      if (new Date(batch.start_date) >= new Date(batch.end_date)) {
        return false;
      }
    }
    return true;
  };
  const postItinerary = async () => {
    dispatch(setValue({ key: "to_show_loader", value: true }));
    try {
      const formattedBatches = packagedetails?.batches?.map((batch) => ({
        ...batch,
        start_date: moment(batch.start_date)
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        end_date: moment(batch.end_date)
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      }));
      const formated_base_packages = packagedetails?.base_packages?.map(
        (base) => ({
          ...base,
          original_price: Number(base.original_price),
          discounted_price: Number(base.discounted_price),
        })
      );
      const formatted_pickup_point = packagedetails?.pickup_point?.map(
        (pick) => ({
          ...pick,
          price: Number(pick.price),
        })
      );
      const formatted_drop_point = packagedetails?.drop_point?.map((drop) => ({
        ...drop,
        price: Number(drop.price),
      }));
      const data_to_send = {
        title: state.iti_name,
        description: state.iti_desc,
        shortDescription: state.iti_short_desc,
        city: state.iti_city,
        view_images: state.iti_img,
        duration: state.iti_duration != null ? Number(state.iti_duration) : 0,
        altitude: state.iti_altitude,
        scenery: state.iti_scenary,
        cultural_sites: state.iti_cultural_site,
        itin_pdf: state.iti_brochure_banner,
        day_details: dayintro,
        hotels: hotelinfo,
        notes: state.iti_notes,
        base_packages: formated_base_packages,
        pickup_point: formatted_pickup_point,
        drop_point: formatted_drop_point,
        batches: formattedBatches,
        is_trending: true,
        is_active: true,
        categoryId: state.selected_category,
        inclusions_exclusions: {
          inclusions: state.iti_inclusion,
          exclusions: state.iti_exclusion,
        },
      };
      console.log("logging every details", data_to_send);
      await post(API_ENDPOINTS.ADMIN.POST_NEW_ITINERARY, data_to_send).then(
        (d) => {
          if (d.message == "ITINERARY_ADDED" && d.success == true) {
            dispatch(setValue({ key: "to_show_loader", value: false }));
            setState((prevs) => ({ ...prevs, is_modalopen: false }));
            dispatch(
              setValue({
                key: "to_show_alert",
                value: true,
              })
            ),
              dispatch(
                setValue({
                  key: "alert_content",
                  value: "Itinerary Added Successfully",
                })
              );
            fetch_iti(state.fetched_data[0]?.id);
          }
        }
      );
    } catch (error) {
      dispatch(setValue({ key: "to_show_loader", value: false }));
      console.error(error);
      const err_response = error?.response?.data;
      if (
        err_response.success == false &&
        err_response.message == "VALIDATION_INVALID_TOKEN"
      ) {
        localStorageHelper.removeItem("login_data");
        router.push(PAGES.LOGIN, { replace: true });
      }
    }
  };
  const editItinerary = async () => {
    dispatch(setValue({ key: "to_show_loader", value: true }));
    try {
      const formattedBatches = packagedetails?.batches?.map((batch) => ({
        ...batch,
        start_date: moment(batch.start_date)
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        end_date: moment(batch.end_date)
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      }));
      const formated_base_packages = packagedetails?.base_packages?.map(
        (base) => ({
          ...base,
          original_price: Number(base.original_price),
          discounted_price: Number(base.discounted_price),
        })
      );
      const formatted_pickup_point = packagedetails?.pickup_point?.map(
        (pick) => ({
          ...pick,
          price: Number(pick.price),
        })
      );
      const formatted_drop_point = packagedetails?.drop_point?.map((drop) => ({
        ...drop,
        price: Number(drop.price),
      }));
      const data_to_send = {
        title: state.iti_name,
        description: state.iti_desc,
        shortDescription: state.iti_short_desc,
        city: state.iti_city,
        view_images: state.iti_img,
        duration: state.iti_duration != null ? Number(state.iti_duration) : 0,
        altitude: state.iti_altitude,
        scenery: state.iti_scenary,
        cultural_sites: state.iti_cultural_site,
        itin_pdf: state.iti_brochure_banner,
        day_details: dayintro,
        hotels: hotelinfo,
        notes: state.iti_notes,
        base_packages: formated_base_packages,
        pickup_point: formatted_pickup_point,
        drop_point: formatted_drop_point,
        batches: formattedBatches,
        category: [],
        on_sale: null,
        deleted: false,
        is_trending: true,
        is_active: true,
        categoryId: state.selected_category,
        inclusions_exclusions: {
          inclusions: state.iti_inclusion,
          exclusions: state.iti_exclusion,
        },
      };
      console.log("logging every details for edit", data_to_send);
      await put(
        API_ENDPOINTS.ADMIN.POST_NEW_ITINERARY + `/${state.iti_id}`,
        data_to_send
      ).then((d) => {
        if (d.message == "ITINERARY_UPDATED" && d.success == true) {
          dispatch(setValue({ key: "to_show_loader", value: false }));
          setState((prevs) => ({ ...prevs, is_modalopen: false }));
          dispatch(
            setValue({
              key: "to_show_alert",
              value: true,
            })
          ),
            dispatch(
              setValue({
                key: "alert_content",
                value: "Itinerary Added Successfully",
              })
            );
          fetch_iti(state.fetched_data[0]?.id);
        }
      });
    } catch (error) {
      dispatch(setValue({ key: "to_show_loader", value: false }));
      console.error(error);
      const err_response = error?.response?.data;
      if (
        err_response.success == false &&
        err_response.message == "VALIDATION_INVALID_TOKEN"
      ) {
        localStorageHelper.removeItem("login_data");
        router.push(PAGES.LOGIN, { replace: true });
      }
    }
  };
  return (
    <div>
      <CustomModal
        backdropvalue="0.1"
        open={state.is_modalopen}
        handleClose={() =>
          setState((prevs) => ({ ...prevs, is_modalopen: false }))
        }
        title={
          state.current_modal_page_count == 1 ? (
            state.modal_open_purpose == "view_page" ? (
              <span>
                Viewing this
                <strong> {state.iti_name}</strong>
              </span>
            ) : state.modal_open_purpose == "edit_iti" ? (
              <span>
                Editing this
                <strong> {state.iti_name}</strong>
              </span>
            ) : state.modal_open_purpose == "duplicate_iti" ? (
              <span>
                Duplicating this
                <strong> {state.iti_name}</strong>
              </span>
            ) : (
              <span>
                Add new
                <strong> Itinerary</strong>
              </span>
            )
          ) : state.current_modal_page_count == 2 ? (
            <span>
              Daywise<strong> Activities</strong>
            </span>
          ) : state.current_modal_page_count == 3 ? (
            <span>
              <strong>Hotel</strong> Details
            </span>
          ) : (
            <span>
              Necessary<strong> Information</strong>
            </span>
          )
        }
        description={
          state.current_modal_page_count == 1 &&
          state.modal_open_purpose != "edit_iti" &&
          state.modal_open_purpose != "view_page" &&
          "Create a new itinerary by filling out details including destinations, dates, transportation, and activities."
        }
        restContent={
          <div className="">
            {state.current_modal_page_count == 1 && (
              <div>
                <div className="flex flex-wrap lg:flex-nowrap gap-4 mt-6">
                  <CustomInput
                    top_title="Itinerary Name"
                    content="Enter name of Itinerary"
                    backgroundColor="white"
                    value={state.iti_name}
                    onchange={(e) =>
                      setState((prevs) => ({
                        ...prevs,
                        iti_name: e.target.value,
                      }))
                    }
                    error_text={
                      state.to_show_error &&
                      state.iti_name?.length == 0 &&
                      "Enter the name of itinerary to continue"
                    }
                  />
                  <CustomInput
                    backgroundColor="white"
                    top_title="Travel Location"
                    content="Enter name of City"
                    value={state.iti_city}
                    onchange={(e) =>
                      setState((prevs) => ({
                        ...prevs,
                        iti_city: e.target.value,
                      }))
                    }
                    error_text={
                      state.to_show_error &&
                      state.iti_city?.length == 0 &&
                      "Enter the city to continue"
                    }
                  />

                  <div>
                    <CustomMultiItiSelect
                      top_title={"Choose Categories"}
                      option_data={state.categories_data}
                      multiple={true}
                      selectedValue={state.selected_category}
                      onOpen={() =>
                        state.categories_list?.length === 0
                          ? getAllCategories()
                          : null
                      }
                      content_destruct={(item) => `${item.name}`}
                      onChange={(selectedIds) =>
                        setState((prevs) => ({
                          ...prevs,
                          selected_category: selectedIds,
                        }))
                      }
                    />
                    {/* {state.to_show_error &&
                      state.selected_category?.length == 0 && (
                        <div className="flex justify-start my-2">
                          <CustomText
                            content={'Please add a category to continue'}
                            className="text-red-500"
                            fontsize="12px"
                          />
                        </div>
                      )} */}
                  </div>
                </div>

                <div className="flex justify-start items-start mt-4">
                  <div className="mr-4">
                    <div className="text-start">
                      <CustomText
                        secondaryfontsize
                        secondaryfontweight
                        content={"View Images :"}
                        className={`mb-3  `}
                      />
                    </div>
                    <Box className="flex flex-col w-full mb-4">
                      {(state.iti_img || []).map((image, fileIndex) => (
                        <Box
                          key={fileIndex}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <div
                            className={`flex flex-wrap justify-center items-center rounded-md border border-dashed border-black p-3 bg-[#FAFAFA]`}
                          >
                            <button
                              className="font-nunitoregular400 text-white bg-black py-3 px-8 rounded-md transition-transform transform duration-75 active:scale-95"
                              onClick={() => {
                                if (image?.name == null) {
                                  document
                                    .getElementById(`inputfile-${fileIndex}`)
                                    .click();
                                } else {
                                  handleUpload(fileIndex);
                                }
                              }}
                              disabled={
                                typeof image === "string" && image !== ""
                              }
                            >
                              {typeof image === "string" && image !== ""
                                ? "Image Uploaded"
                                : image && image.name
                                  ? "Upload"
                                  : "Browse..."}
                            </button>

                            {(!image ||
                              (typeof image !== "string" && image !== "")) && (
                              <button
                                className="font-nunitoregular400 text-black py-3 px-8 rounded-md"
                                onClick={() =>
                                  document
                                    .getElementById(`inputfile-${fileIndex}`)
                                    .click()
                                }
                              >
                                {image && image.name
                                  ? image.name
                                  : "Or drop Brochure Activity Images here"}
                              </button>
                            )}

                            <input
                              id={`inputfile-${fileIndex}`}
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                handleImageChange(fileIndex, e);
                              }}
                            />
                          </div>
                          {state.iti_img?.length > 1 && (
                            <IconButton
                              onClick={() => removeFileInput(fileIndex)}
                              color="error"
                              sx={{ marginLeft: "8px" }}
                            >
                              <FaMinus />
                            </IconButton>
                          )}
                        </Box>
                      ))}
                      <IconButton
                        onClick={() => addFileInput()}
                        color="primary"
                      >
                        <FaPlus />
                      </IconButton>
                      {/* <div className="flex flex-col w-full mb-4">
                          <div className="flex flex-wrap justify-start items-center rounded-md">
                            <div
                              className={`flex flex-wrap justify-center items-center rounded-md border border-dashed border-black p-3 bg-[#FAFAFA]`}
                            >
                              <button
                                className="font-nunitoregular400 text-white bg-black py-3 px-8 rounded-md transition-transform transform duration-75 active:scale-95"
                                onClick={() =>
                                  document.getElementById(`file-input`).click()
                                }
                              >
                                {'Browse...'}
                              </button>

                              <button
                                className="font-nunitoregular400 text-black py-3 px-8 rounded-md"
                                onClick={() =>
                                  document.getElementById(`file-input`).click()
                                }
                              >
                                {'Or drop Brochure Activity Images here'}
                              </button>

                              <input
                                id="file-input"
                                type="file"
                                multiple // Allow selecting multiple files
                                onChange={handleImageChange}
                                className="hidden"
                              />

                              {state.uploading && <p>Uploading...</p>}
                            </div>
                            {state.iti_img?.length > 0 && (
                              <CustomButton
                                content={'Remove all image'}
                                text_classname={'text-red-500'}
                                onClick={() =>
                                  setState((prevs) => ({
                                    ...prevs,
                                    iti_img: []
                                  }))
                                }
                              />
                            )}
                            <p className="text-start ml-4">
                              {'Uploaded: ' + state.iti_img?.length}
                            </p>
                          </div>
                        </div> */}

                      {state.to_show_error &&
                        state.iti_img?.[0]?.length == 0 && (
                          <div className="flex justify-start my-2">
                            <CustomText
                              content={"Please add a image to continue"}
                              className="text-red-500"
                              fontsize="12px"
                            />
                          </div>
                        )}
                    </Box>
                  </div>
                  <div className="w-full">
                    <CustomInput
                      textarea_input
                      backgroundColor="white"
                      top_title="Short Description"
                      content="Enter short description"
                      custompadding="p-6"
                      value={state.iti_short_desc}
                      onchange={(e) =>
                        setState((prevs) => ({
                          ...prevs,
                          iti_short_desc: e.target.value,
                        }))
                      }
                      error_text={
                        state.to_show_error &&
                        state.iti_short_desc?.length == 0 &&
                        "Enter the short description to continue"
                      }
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <CustomInput
                    textarea_input
                    backgroundColor="white"
                    top_title="Description"
                    content="Add some description about the itinerary"
                    custompadding="pr-12 pt-3 pb-16 pl-2"
                    value={state.iti_desc}
                    onchange={(e) =>
                      setState((prevs) => ({
                        ...prevs,
                        iti_desc: e.target.value,
                      }))
                    }
                    error_text={
                      state.to_show_error &&
                      state.iti_desc?.length == 0 &&
                      "Enter the description to continue"
                    }
                  />
                </div>
                <div className="mt-4 flex gap-4">
                  <CustomInput
                    backgroundColor="white"
                    top_title="Duration"
                    content="Add Duration (In Days)"
                    default_input_type={false}
                    set_input_type="number"
                    // custompadding="pr-12 pt-3 pb-16 pl-2"
                    value={state.iti_duration}
                    onchange={(e) =>
                      setState((prevs) => ({
                        ...prevs,
                        iti_duration: e.target.value,
                      }))
                    }
                    error_text={
                      state.to_show_error &&
                      state.iti_duration == 0 &&
                      "Enter the duration to continue"
                    }
                  />
                  <CustomInput
                    backgroundColor="white"
                    top_title="Altitude"
                    content="Enter your Altitude"
                    // custompadding="pr-12 pt-3 pb-16 pl-2"
                    value={state.iti_altitude}
                    onchange={(e) =>
                      setState((prevs) => ({
                        ...prevs,
                        iti_altitude: e.target.value,
                      }))
                    }
                    // error_text={
                    //   state.to_show_error &&
                    //   state.iti_altitude?.length == 0 &&
                    //   'Enter the altitude to continue'
                    // }
                  />
                  <CustomInput
                    backgroundColor="white"
                    top_title="Scenary"
                    content="Enter your View"
                    // custompadding="pr-12 pt-3 pb-16 pl-2"
                    value={state.iti_scenary}
                    onchange={(e) =>
                      setState((prevs) => ({
                        ...prevs,
                        iti_scenary: e.target.value,
                      }))
                    }
                    // error_text={
                    //   state.to_show_error &&
                    //   state.iti_scenary?.length == 0 &&
                    //   'Enter the scenary to continue'
                    // }
                  />

                  <CustomInput
                    backgroundColor="white"
                    top_title="Cultural Site"
                    content="Add Cultural Site"
                    // custompadding="pr-12 pt-3 pb-16 pl-2"
                    value={state.iti_cultural_site}
                    onchange={(e) =>
                      setState((prevs) => ({
                        ...prevs,
                        iti_cultural_site: e.target.value,
                      }))
                    }
                    // error_text={
                    //   state.to_show_error &&
                    //   state.iti_cultural_site?.length == 0 &&
                    //   'Enter the cultural site to continue'
                    // }
                  />
                </div>
                <div className="mt-4">
                  <CustomInput
                    backgroundColor="white"
                    top_title="Brochure Banner : "
                    content="Paste the Drive link to Brochure"
                    // custompadding="pr-12 pt-3 pb-16 pl-2"
                    value={state.iti_brochure_banner}
                    onchange={(e) =>
                      setState((prevs) => ({
                        ...prevs,
                        iti_brochure_banner: e.target.value,
                      }))
                    }
                    error_text={
                      state.to_show_error &&
                      state.iti_brochure_banner?.length == 0 &&
                      "Enter the brochure banner link to continue"
                    }
                  />
                </div>
              </div>
            )}
            {state.current_modal_page_count == 2 && (
              <div className="mt-4">
                <DraggableInputList
                  inputState={dayintro}
                  setFinalData={setdayintro}
                  to_show_error={state.page2_error}
                />
              </div>
            )}
            {/* {console.log('logging dayintro', dayintro)} */}
            {state.current_modal_page_count == 3 && (
              <div className="mt-4">
                <DraggableHotelList
                  hotelstate={hotelinfo}
                  setHotels={sethotelinfo}
                  to_show_error={state.page3_error}
                />
              </div>
            )}
            {state.current_modal_page_count == 4 && (
              <div>
                <div className="flex gap-4 mt-4">
                  <div className="">
                    {/* <CustomInput
                      top_title="Inclusion"
                      content="Enter listed Inclusions with ',' separated "
                      backgroundColor="white"
                      value={state.iti_inclusion}
                      onchange={(e) =>
                        setState((prevs) => ({
                          ...prevs,
                          iti_inclusion:
                            e.target.value != null
                              ? e.target.value?.split(',')
                              : e.target.value
                        }))
                      }
                      error_text={
                        state.to_show_error &&
                        state.iti_inclusion?.length == 0 &&
                        'Enter the inclusions to continue'
                      }
                    /> */}
                    <InfiniteInputBox
                      InputBox
                      initialValues={state.iti_inclusion}
                      objectstate
                      onChange={(e) =>
                        setState((prevs) => ({
                          ...prevs,
                          iti_inclusion: e,
                        }))
                      }
                      top_title="Inclusion"
                      minW="250px"
                      placeholder_text="inclusion"
                    />
                    {state.to_show_error && state.iti_inclusion[0] == "" && (
                      <div className="flex justify-start my-2">
                        <CustomText
                          content={"Enter the inclusions to continue"}
                          className="text-red-500"
                          fontsize="12px"
                        />
                      </div>
                    )}
                  </div>
                  <div className="">
                    {/* <CustomInput
                      top_title="Exclusion"
                      content="Enter listed Exclusions with ',' separated"
                      backgroundColor="white"
                      value={state.iti_exclusion}
                      onchange={(e) =>
                        setState((prevs) => ({
                          ...prevs,
                          iti_exclusion:
                            e.target.value != null
                              ? e.target.value?.split(',')
                              : e.target.value
                        }))
                      }
                      error_text={
                        state.to_show_error &&
                        state.iti_exclusion?.length == 0 &&
                        'Enter the exclusion to continue'
                      }
                    /> */}
                    <InfiniteInputBox
                      initialValues={state.iti_exclusion}
                      objectstate
                      onChange={(e) =>
                        setState((prevs) => ({
                          ...prevs,
                          iti_exclusion: e,
                        }))
                      }
                      top_title="Exclusion"
                      minW="250px"
                      placeholder_text="exclusion"
                    />
                    {state.to_show_error && state.iti_exclusion[0] == "" && (
                      <div className="flex justify-start my-2">
                        <CustomText
                          content={"Enter the exclusions to continue"}
                          className="text-red-500"
                          fontsize="12px"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full ">
                  {/* <CustomInput
                    top_title="Notes"
                    content="Add Note Points"
                    backgroundColor="white"
                    value={state.iti_notes}
                    onchange={(e) =>
                      setState((prevs) => ({
                        ...prevs,
                        iti_notes:
                          e.target.value != null
                            ? e.target.value?.split(',')
                            : e.target.value
                      }))
                    }
                    error_text={
                      state.to_show_error &&
                      state.iti_notes?.length == 0 &&
                      'Enter the notes to continue'
                    }
                  /> */}
                  <InfiniteInputBox
                    InputBox
                    initialValues={state.iti_notes}
                    objectstate
                    onChange={(e) =>
                      setState((prevs) => ({
                        ...prevs,
                        iti_notes: e,
                      }))
                    }
                    top_title="Notes"
                    minW="250px"
                    placeholder_text="note"
                  />
                  {state.to_show_error && state.iti_notes[0] == "" && (
                    <div className="flex justify-start my-2">
                      <CustomText
                        content={"Enter the inclusions to continue"}
                        className="text-red-500"
                        fontsize="12px"
                      />
                    </div>
                  )}
                </div>
                <h2 className="font-nunitoregular400 mt-4  text-[34px]">
                  {
                    <span>
                      Itinerary <strong>Pricing</strong>
                    </span>
                  }
                </h2>
                <div className="w-full text-start mt-4">
                  <CustomText content={"Package Details"} fontsize="16px" />
                </div>
                <PackageComp
                  state={packagedetails}
                  setState={setpackagedetails}
                  to_show_error={state.page4_error}
                />
              </div>
            )}

            <div className="flex justify-center">
              {state.current_modal_page_count > 1 && (
                <div className=" mt-4 mr-4">
                  <CustomButton
                    className="mt-3 border-2 border-[#3A3A3A]"
                    text_color={"text-[#3A3A3A]"}
                    content={"Previous"}
                    onClick={() =>
                      setState((prevs) => ({
                        ...prevs,
                        current_modal_page_count:
                          prevs.current_modal_page_count > 1
                            ? prevs.current_modal_page_count - 1
                            : prevs.current_modal_page_count,
                      }))
                    }
                  />
                </div>
              )}

              {!(
                state.modal_open_purpose === "view_page" &&
                state.current_modal_page_count === 4
              ) && (
                <div className=" mt-4">
                  <CustomButton
                    className="mt-3 bg-gradient-to-r from-[#FF8D38] to-[#FF5F06] "
                    text_classname={"text-white"}
                    content={
                      state.current_modal_page_count < 4
                        ? "Next"
                        : state.current_modal_page_count == 4 &&
                            state.modal_open_purpose == "edit_iti"
                          ? "Edit this " + state.iti_name
                          : state.modal_open_purpose == "duplicate_iti"
                            ? "Duplicate this" + state.iti_name
                            : "Create new Itinerary"
                    }
                    onClick={() => {
                      if (state.current_modal_page_count < 4) {
                        if (
                          state.current_modal_page_count == 1 &&
                          (state.iti_name?.length == 0 ||
                            state.iti_city?.length == 0 ||
                            state.iti_img[0] == "" ||
                            state.iti_short_desc?.length == 0 ||
                            state.iti_desc?.length == 0 ||
                            state.iti_duration?.length == 0 ||
                            state.iti_brochure_banner?.length == 0)
                        ) {
                          setState((prevs) => ({
                            ...prevs,
                            to_show_error: true,
                          }));
                          return;
                        } else if (state.current_modal_page_count == 2) {
                          console.log("logging dayintro", dayintro);
                          if (validateDayIntro(dayintro) == false) {
                            setState((prevs) => ({
                              ...prevs,
                              page2_error: true,
                            }));
                            return;
                          }
                        } else if (state.current_modal_page_count == 3) {
                          console.log("logging ", validateHotels(hotelinfo));
                          if (validateHotels(hotelinfo) == false) {
                            setState((prevs) => ({
                              ...prevs,
                              page3_error: true,
                            }));
                            return;
                          }
                        }
                        setState((prevs) => ({
                          ...prevs,
                          current_modal_page_count:
                            prevs.current_modal_page_count < 4
                              ? prevs.current_modal_page_count + 1
                              : prevs.current_modal_page_count,
                        }));
                      } else {
                        if (
                          validatePackages(packagedetails) == false ||
                          state.iti_inclusion?.length == 0 ||
                          state.iti_exclusion?.length == 0 ||
                          state.iti_notes?.length == 0
                        ) {
                          setState((prevs) => ({
                            ...prevs,
                            to_show_error: true,
                            page4_error: true,
                          }));
                          return;
                        }
                        state.modal_open_purpose == "add_new" ||
                        state.modal_open_purpose == "duplicate_iti"
                          ? postItinerary()
                          : state.modal_open_purpose == "edit_iti" &&
                            editItinerary();
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        }
      />
    </div>
  );
}

export default AddNewItiComp;
