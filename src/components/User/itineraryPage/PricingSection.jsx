"use client";

import { MenuItem, Select } from "@mui/material";
import CustomText from "../../../components/CustomText";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import CustomModal from "../../../components/CustomModal";
import CustomCallBackReq from "../components/CustomCallBackReq";

const PricingComponent = ({
  openPopup,
  base_packages,
  batches,
  pickup_point,
  drop_point,
  selectedBatch,
  setSelectedBatch,
  selectedPackage,
  setSelectedPackage,
  selectedStartingPoint,
  setSelectedStartingPoint,
  selectedDroppingPoint,
  setSelectedDroppingPoint,
  showCallBackForm,
  setShowCallBackForm,
}) => {
  const [errors, setErrors] = useState({
    package: "",
    batch: "",
    startingPoint: "",
    droppingPoint: "",
  });
  const [mapToHoldBatches, setMapToHoldBatches] = useState(null);
  const [currMapKeySelected, setCurrMapKeySelected] = useState("ALL");
  const validate = () => {
    let valid = true;
    const newErrors = {
      package: "",
      batch: "",
      startingPoint: "",
      droppingPoint: "",
    };

    if (!selectedPackage) {
      newErrors.package = "Please select a package.";
      valid = false;
    }
    if (!selectedBatch) {
      newErrors.batch = "Please select a batch.";
      valid = false;
    }
    if (!selectedStartingPoint) {
      newErrors.startingPoint = "Please choose a starting point.";
      valid = false;
    }
    if (!selectedDroppingPoint) {
      newErrors.droppingPoint = "Please choose a dropping point.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      openPopup();
    }
  };
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (batches) {
      const arr = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUNE",
        "JULY",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
        "ALL",
      ];

      const map = new Map();

      arr.forEach((month) => {
        map.set(month, -1);
      });

      batches?.forEach((trips) => {
        const currTripMonth = moment(trips.start_date).format("MMM");
        const currTripArray = map?.get(currTripMonth) || [];
        currTripArray.push(trips);
        map.set(currTripMonth.toUpperCase(), [...currTripArray]);
        if (map.get("ALL") == -1) {
          map.set("ALL", [...currTripArray]);
        } else {
          const allCurrData = map.get("ALL");

          map.set("ALL", [...allCurrData, ...currTripArray]);
        }

        console.log("currTripMonth", map);
      });

      setMapToHoldBatches(map);
    }
  }, [batches]);

  return (
    <div className="h-screen">
      <div className=" p-5 min-w-full max-w-full  md:block sm:hidden   font-titleRegular mx-auto my-3 bg-white py-2 rounded-lg ">
        {/* Pricing Section - Starting from */}
        <div
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          className="flex  flex-col justify-center items-center bg-white p-4 rounded-xl shadow-md "
        >
          <div>
            {/* Title and Discount Badge */}
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Starting From
              </h3>
              <span className="text-xs bg-blue-100 text-blue-600 font-semibold px-2 pt-1 rounded-full">
                Upto ₹2,500 OFF
              </span>
            </div>

            {/* Price Section */}
            <div className="flex items-center mt-2">
              <span className="line-through text-gray-400 text-lg mr-2">
                ₹
                {(
                  (selectedPackage?.original_price ||
                    base_packages?.[0]?.original_price) +
                  (selectedStartingPoint?.price || 0) +
                  (selectedDroppingPoint?.price || 0)
                ).toLocaleString()}
              </span>
              <span className="text-3xl font-bold text-orange-500">
                ₹
                {(
                  (selectedPackage?.discounted_price ||
                    base_packages?.[0]?.discounted_price) +
                  (selectedStartingPoint?.price || 0) +
                  (selectedDroppingPoint?.price || 0)
                ).toLocaleString()}
              </span>
              <span className="text-sm bg-white text-gray-700 px-4 py-4 "></span>
              <span className="text-xs bg-blue-100 text-gray-700 px-2 py-1 rounded-full">
                Per Person
              </span>
            </div>

            {/* Per Person Label */}
            {/* <div className="mt-1">
              
            </div> */}
          </div>

          {/* Book Now Button */}
          <button
            onClick={handleSubmit}
            className="bg-orange-500 mt-4 w-full text-white py-2 rounded-full text-lg font-bold hover:bg-orange-600 transition duration-300"
          >
            Book Now
          </button>
        </div>

        {/* Pricing */}
        <div className="">
          <h4 className="text-lg font-semibold mt-2 text-gray-700">
            Pricing
            <span className="ml-0.5 font-normal text-red-600">*</span>
          </h4>
          <div className="relative mt-1 border p-4 rounded-lg max-h-full overflow-auto border-gray-300">
            {base_packages?.map((packages, index) => (
              <div
                key={index}
                className={`flex justify-between items-center my-2 px-2 cursor-pointer ${
                  !selectedPackage && index == 0
                    ? "border-[1px] border-black/30 rounded-lg"
                    : ""
                } ${
                  selectedPackage?.name === packages.name
                    ? " border-2 border-black "
                    : ""
                } `}
                onClick={() => setSelectedPackage(packages)}
              >
                <span className="text-gray-600">{packages?.name}</span>
                <div className="text-nowrap flex justify-start items-center text-start">
                  <div className="line-through inline-block mx-4">
                    ₹ {packages?.original_price}/-
                  </div>
                  <div className="text-orange-500 inline-block">
                    ₹ {packages?.discounted_price}/-
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!selectedPackage && errors.package && (
            <CustomText
              className="px-4 py-2 text-red-600"
              content={errors.package}
              fontsize="12px"
            />
          )}
        </div>

        {/* Batches */}
        <div className="mb-6 ">
          <div className="flex border-green-400 items-center-center gap-2 py-4 justify-between">
            <h4 className="text-lg font-semibold text-gray-700">
              Batches
              <span className="ml-0.5 font-normal text-red-600">*</span>
            </h4>

            <div className=" w-40 scrollbar-orange flex gap-2 uppercase px-2  overflow-x-scroll bg-white/25   text-slate-800 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] cursor-pointer m-1 p-1 text-sm font-bold backdrop-blur-md rounded-[10px]">
              {mapToHoldBatches && (
                <div
                  className={` hover:bg-orange-400    m-1 p-1 text-sm font-bold rounded-md ${
                    currMapKeySelected == "ALL" ? "bg-[#EA580C] text-white" : ""
                  }`}
                  onClick={() => setCurrMapKeySelected("ALL")}
                  key={"ALL"}
                >
                  ALL
                </div>
              )}
              {mapToHoldBatches &&
                Array.from(mapToHoldBatches.entries()).map(([key, val]) => {
                  if (val === -1 || key == "ALL") return null;
                  return (
                    <div
                      className={` hover:bg-orange-400   m-1 p-1 text-sm font-bold rounded-md ${
                        currMapKeySelected == key
                          ? "bg-[#EA580C] text-white"
                          : ""
                      }`}
                      onClick={() => setCurrMapKeySelected(key)}
                      key={key}
                    >
                      {key}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* <div className="relative">
            <button
              onClick={() => scroll(-100)}
              className="absolute -left-0 top-1/2 -translate-y-1/2 z-10 aspect-square p-1.5 border-[1px] border-black/10 bg-gray-50 hover:bg-gray-200 rounded-full transform"
            >
              <FaAngleLeft />
            </button>
            <div
              ref={scrollRef}
              className="flex space-x-2 mt-2 border p-4 mx-8 rounded-full overflow-auto no-scrollbar relative"
            >
              {batches?.map((batch, index) => (
                <button
                  key={index}
                  className={`py-2 flex-shrink-0 text-sm px-4 rounded-full border relative ${
                    batch.is_sold
                      ? "bg-white text-gray-500 cursor-not-allowed"
                      : selectedBatch === batch
                        ? "bg-gray-200"
                        : "bg-gray-50 hover:bg-gray-300"
                  }`}
                  onClick={() => {
                    if (batch.is_sold) return
                    setSelectedBatch(batch)
                  }}
                >
                  <div className="flex flex-col justify-center items-center">
                    <div>
                      {moment(batch.start_date).format("DD-MMM ")} To {moment(batch.end_date).format("DD-MMM ")}
                    </div>
                    {batch.is_sold && <div className="text-[7px] bg-red-600 text-white px-1 rounded-lg">Sold Out</div>}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => scroll(100)}
              className="absolute -right-0 top-1/2 -translate-y-1/2 p-1.5 border-[1px] border-black/10 z-10 aspect-square bg-gray-50 hover:bg-gray-200 rounded-full transform"
            >
              <FaAngleRight />
            </button>
          </div> */}

          <div className="relative  bg-orange-400 w-full h-24 overflow-x-auto scrollbar-orange">
            {mapToHoldBatches &&
              currMapKeySelected &&
              mapToHoldBatches?.get(currMapKeySelected)?.map((batch, index) => {
                return (
                  <div
                    onClick={() => {
                      if (batch?.is_sold) {
                        return;
                      } else
                      {
                         setSelectedBatch(batch);}
                    }}
                    key={index}
                    className={`bg-slate-50 p-2 m-2  border-4 hover:border-red-400   rounded-md ${
                      batch?.is_sold
                        ? "cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <p className={`${selectedBatch === batch ? "bg-gray-200"
                        : "bg-gray-50"} hover:bg-gray-300 text-slate-800 cursor-pointer hover:scale-y-105   font-semibold`}>
                      {moment(batch.start_date).format("DD-MMM ")} To{" "}
                      {moment(batch.end_date).format("DD-MMM ")}
                    </p>
                  </div>
                );
              })}
          </div>
          {!selectedBatch && errors.batch && (
            <CustomText className="px-4 py-2 text-red-600" content={errors.batch} fontsize="12px" />
          )}
        </div>

        {/* Starting and Dropping Points */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <Dropdown
              label="Starting Point"
              options={pickup_point}
              selectedValue={selectedStartingPoint?.name}
              onChange={(value) =>
                setSelectedStartingPoint(
                  pickup_point.find((point) => point.name === value)
                )
              }
              placeholder="Choose Starting Point"
              error={errors.startingPoint}
            />
          </div>
          <div>
            <Dropdown
              label="Dropping Point"
              options={drop_point}
              selectedValue={selectedDroppingPoint?.name}
              onChange={(value) =>
                setSelectedDroppingPoint(
                  drop_point.find((point) => point.name === value)
                )
              }
              placeholder="Choose Dropping Point"
              error={errors.droppingPoint}
            />
          </div>
        </div>
      </div>

      {/* <CustomModal
        padding={4}
        open={showCallBackForm}
        handleClose={() => setShowCallBackForm(false)}
        restContent={<CustomCallBackReq setShowCallBackForm={setShowCallBackForm} />}
      /> */}
    </div>
  );
};
const Dropdown = ({
  label,
  options,
  selectedValue,
  onChange,
  placeholder = "Select an option",
  error = "",
}) => {
  return (
    <div className="w-full  ">
      <div className=" w-fit relative mb-3 text-sm font-nunito-semiBold600">
        {label}
        <span className="ml-0.5 absolute left-full font-normal text-red-600">
          *
        </span>
      </div>
      <Select
        sx={{
          "& .MuiInputBase-root": { borderRadius: "0.75rem", padding: "8px" }, // Increased border radius
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#3B3B3B" },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3B3B3B",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3B3B3B",
          },
          "& .MuiSelect-select": { padding: "8px 16px" },
          "& .MuiSvgIcon-root": {
            right: "5px",
            top: "50%",
            transform: "translateY(-50%)",
          },
        }}
        className="w-full"
        value={selectedValue || "null"}
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="null" disabled>
          {placeholder}
        </MenuItem>
        {options?.map((option, index) => (
          <MenuItem key={index} value={option.name}>
            <div className="flex items-center justify-between">
              <div>{option.name}</div>
              <span className="mx-1">|</span>
              <div> ₹{option.price}/-</div>
            </div>
          </MenuItem>
        ))}
      </Select>
      {error && !selectedValue && (
        <div className="px-4 py-2 text-red-600 text-sm">{error}</div>
      )}
    </div>
  );
};

export default PricingComponent;
