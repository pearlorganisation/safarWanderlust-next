"use client"

import { USERS_PAGE } from '@/constants/PagesName'
import { useRouter } from 'next/navigation'

import React from 'react'


const AboutSectionInFeature = ({ title, description, activeIndexM, id,routeMap }) => {
  const router = useRouter()
  return (
    <>
      <div className="sm:flex md:flex hidden items-center justify-center flex-shrink-0">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full border-2 border-gray-500 flex items-center justify-center text-gray-500 ${
                activeIndexM + 1 === 1 ? 'bg-gray-500/30' : ''
              }`}
            >
              1
            </div>
            <div className="h-[70px] w-px bg-gray-500"></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full border-2 border-gray-500 flex items-center justify-center text-gray-500 ${
                activeIndexM + 1 === 2 ? 'bg-gray-500/30' : ''
              }`}
            >
              2
            </div>
            <div className="h-[70px] w-px bg-gray-500"></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full border-2 border-gray-500 flex items-center justify-center text-gray-500 ${
                activeIndexM + 1 === 3 ? 'bg-gray-500/30' : ''
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* Content Section (dynamic text based on active index) */}
        <div className="flex flex-col items-start justify-center p-8 h-full w-[70%]">
          <h2 className="text-3xl font-titleRegular text-white mb-4">
            <span className="text-white font-titleMedium">{title}</span>
          </h2>
          <p className="text-white mb-8 text-clip overflow-hidden h-12">
            {description}
          </p>
          <button
            onClick={() => router.push(`${USERS_PAGE.ITINERARY}/${routeMap}`)}
            className="px-6 py-3 bg-white text-black font-bold rounded-full shadow-md hover:bg-tertiaryText hover:text-white"
          >
            Explore Now
          </button>
        </div>
      </div>
      <div className="flex sm:hidden md:hidden flex-col items-center justify-center flex-shrink-0">
        {/* Content Section (dynamic text based on active index) */}
        <div className="flex flex-col items-center justify-center overflow-hidden p-8">
          <h2 className="text-xl font-nunitoregular400 text-white mb-1 sm:text-start md:text-center text-center">
            <span className="text-white font-nunitoregular400 sm:text-start md:text-center text-center">
              {title}
            </span>
          </h2>
          
          <p className="text-white text-xs text-center mb-4">{description}</p>
          <button
            onClick={() => router.push(`${USERS_PAGE.ITINERARY}/${routeMap}`)}
            className="px-6 py-2 bg-white text-black text-sm rounded-full shadow-md hover:bg-tertiaryText hover:text-white"
          >
            Explore Now
          </button>
        </div>
      </div>
    </>
  )
}

export default AboutSectionInFeature
