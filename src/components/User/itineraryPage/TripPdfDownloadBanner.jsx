import React from 'react'
import { IoMdDownload } from 'react-icons/io'

const TripPdfDownloadBanner = ({ pdfLink }) => {
  return (
    <div
      className="relative px-8 py-5 md:py-5 md:px-14 mt-8 mx-2 md:mt-0 md:mx-0 rounded-xl md:rounded-none flex items-center justify-center"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 md:bg-slate-100 md:bg-opacity-100 bg-tertiaryText md:rounded-none rounded-xl"></div>

      {/* Content */}
      <div className="relative text-center md:text-center">
        <a
          href={pdfLink}
          target="_blank"
          className="text-2xl md:text-4xl font-titleRegular flex items-center justify-center hover:underline md:hover:no-underline md:hover:border-none hover:border-b-2 hover:border-white text-white md:text-tertiaryText"
        >
          Download Trip PDF{' '}
          <IoMdDownload color="#ff630a" className="ml-2 md:block hidden" />
          <IoMdDownload color="white" className="ml-2 md:hidden block" />
        </a>
        <div className="text-xs md:text-base text-white md:text-tertiaryText mt-2">
          Click here to download our itinerary.
        </div>
      </div>
    </div>
  )
}

export default TripPdfDownloadBanner
