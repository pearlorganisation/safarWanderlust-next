import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaHotel } from 'react-icons/fa' // Icons

const HotelCarousel = ({hotels}) => {


  // State for the current hotel index
  const [current, setCurrent] = useState(0)
  const length = hotels?.length

  // Handle left/right navigation
  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1)
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1)

  // Generate star ratings
  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <span key={i} className="text-yellow-400">
        ★
      </span>
    ))
  }

  return (
    <>
      <section id="hotels" className="relative p-8 hidden md:block">
        <div className="flex items-center mb-4">
          <FaHotel color="white" className="text-white text-xl mr-2" />
          <h2 className="text-2xl font-titleMedium text-white">Hotel</h2>
        </div>
        <div className="relative flex justify-center items-center">
          {/* Previous Arrow */}
          <div
            color="white"
            className="absolute -left-12 top-1/2 z-20  transform -translate-y-1/2 text-white bg-gray-800  rounded-full p-3 cursor-pointer"
            onClick={prevSlide}
          >
            <FaChevronLeft size={15} color='white'/>
          </div>
          {/* Hotel Cards */}
          <div className="overflow-x-hidden w-full">
            <div
              className="flex transition-transform ease-in-out duration-500"
              style={{
                transform: `translateX(-${current * (100 / 4)}%)` // 4 cards per view
              }}
            >
              {hotels?.map((hotel) => (
                <div key={hotel.id} className="w-1/4 p-2 flex-shrink-0">
                  <div className="rounded-lg shadow-lg">
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-60 object-cover rounded-t-lg"
                    />
                    <div className="bg-black p-4 rounded-b-lg">
                      <div className="flex items-center">
                        {renderStars(hotel.rating)}
                        <span className="text-white font-titleRegular ml-2">{hotel.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Next Arrow */}
          <div
            color="white"
            className="absolute -right-12 top-1/2 transform -translate-y-1/2  bg-gray-800 rounded-full p-3 cursor-pointer"
            onClick={nextSlide}
          >
            <FaChevronRight color='white' size={15}/>
          </div>
        </div>
      </section>
      <section id="hotels" className="relative  block md:hidden">
        <div className="flex items-center mb-4">
          <FaHotel
            color="white"
            size={12}
            className="text-white text-xl mr-2"
          />
          <h2 className="  text-white font-titleRegular">Hotel</h2>
        </div>
        <div className="relative flex justify-center items-center">
          {/* Previous Arrow */}
          {/* <FaChevronLeft
            color="white"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 rounded-full p-4 cursor-pointer"
            onClick={prevSlide}
          /> */}
          {/* Hotel Cards */}
          <div className="overflow-x-scroll no-scrollbar w-full">
            <div
              className="flex transition-transform ease-in-out duration-500"
              style={{
                transform: `translateX(-${current * (100 / 4)}%)` // 4 cards per view
              }}
            >
              {hotels?.map((hotel) => (
                <div key={hotel.id} className=" p-2 flex-shrink-0">
                  <div className="relative rounded-lg shadow-lg">
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className=" max-h-60 aspect-square   object-cover rounded-t-lg"
                    />
                    <div className="bg-transparent absolute bottom-0 w-full p-4 rounded-b-lg">
                      <div className="flex items-center">
                        {renderStars(hotel.rating)}
                      </div>
                      <span className="text-white font-titleRegular inline-block text-sm gap-2">
                        {hotel.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Next Arrow */}
          {/* <FaChevronRight
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 rounded-full p-2 cursor-pointer"
            onClick={nextSlide}
          /> */}
        </div>
      </section>
    </>
  )
}

export default HotelCarousel
