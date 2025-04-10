import React from "react";
import { IoMdDownload } from "react-icons/io";

const TripPdfDownloadBanner = ({ pdfLink }) => {
  return (
    <div className="p-5 h-full w-full  text-center md:text-center bg-slate-100  flex flex-col justify-center items-center">
        <a
          href={pdfLink}
          target="_blank"
          className="text-1xl md:text-2xl font-titleRegular flex items-center justify-center hover:underline md:hover:no-underline md:hover:border-none hover:border-b-2 hover:border-white text-white md:text-tertiaryText"
        >
          Download Trip PDF{" "}
          <IoMdDownload color="#ff630a" className="ml-2 md:block hidden" />
          <IoMdDownload color="white" className="ml-2 md:hidden block" />
        </a>
        <div className="text-xs md:text-base text-white md:text-tertiaryText mt-2">
          Click here to download our itinerary.
        </div>
      </div>
  );
};

export default TripPdfDownloadBanner;
