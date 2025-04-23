import React from "react";
import { IoMdDownload } from "react-icons/io";

const TripPdfDownloadBanner = ({ pdfLink }) => {
  return (
    <div style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"}} className="p-5 md:hover:scale-110  rounded-full   text-center md:text-center bg-slate-100  flex flex-col justify-center items-center">
        <a
          href={pdfLink}
          target="_blank"
          className="text-1xl md:text-2xl font-titleRegular flex items-center justify-center hover:underline md:hover:no-underline md:hover:border-none border-b-2 border-transparent hover:border-white text-black md:text-tertiaryText"
        >
          Download Trip PDF{" "}
          <IoMdDownload color="#ff630a" className="ml-2 md:block hidden" />
          <IoMdDownload color="white" className="ml-2 md:hidden block" />
        </a>
        <div className="text-xs md:text-base text-black md:text-tertiaryText mt-2">
          Click here to download our itinerary.
        </div>
      </div>
  );
};

export default TripPdfDownloadBanner;
