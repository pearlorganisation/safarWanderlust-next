import CustomButton from '../../../components/CustomButton'
import { light } from '../../../assets/themes/themes'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const ItenerereyCard = ({
  name,
  routeName,
  image,
  title,
  duration,
  location,
  price,
  city,
  id,
  rating,
  description
}) => {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        {/* <title>{`${title} - Explore ${location}`}</title> */}
        <meta
          name="description"
          content={`${description} Plan your ${duration}-day trip to ${location} for just ₹${price}.`}
        />
        <meta
          name="keywords"
          content={`${title}, ${location}, travel, itineraries, tourism`}
        />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={`${description} Perfect for ${duration}-day trip.`}
        />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={`/itinerary/${routeName}`} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div
        onClick={() => navigate(`/itinerary/${routeName}`)}
        className="  hidden max-w-[320px] max-h-[450px] shrink-0 flex-col items-center gap-y-6 overflow-hidden rounded-xl bg-white   p-2 shadow-lg md:flex"
      >
        {/* Image */}
        <div className="relative w-full">
          <img
            className=" h-48 w-full rounded-xl object-cover"
            src={image}
            alt={title}
          />
          <div
            style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)' }}
            className="absolute -bottom-8 left-1/2 min-w-fit -translate-x-1/2 -translate-y-1/2 text-nowrap rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-gray-600"
          >
            ₹{price} onwards {/* Dynamic price */}
          </div>
        </div>

        <div className="w-full px-1">
          {/* Title and Rating */}
          <div title={title} className="flex  items-center justify-between">
            <div
              className=" text-xl"
              style={{
                maxWidth: '18rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {title}
            </div>{' '}
            {/* Dynamic title with ellipsis */}
            <div className="flex items-center text-yellow-500">
              {/* Dynamic rating */}
              <span className="ml-1 font-medium text-gray-700">{rating}</span>
            </div>
          </div>

          {/* Price */}

          {/* Duration and Location */}
          <div className="my-1 flex text-nowrap overflow-hidden  items-center justify-left gap-x-3 text-sm text-gray-500">
            <span>{duration + ' days & ' + (duration - 1) + ' Nights'}</span>|
            <span title={location}>{location}</span>
            {/* Dynamic duration and location */}
          </div>

          {/* Description */}
          <div className="mt-1.5 text-xs h-16 overflow-hidden text-gray-700">
            {description} {/* Dynamic description */}
          </div>

          {/* Button */}
          {/* <button
          onClick={() => navigate(`/itinerary/${id}`)}
          className="w-full mt-8 bg-orange-500 text-white font-semibold py-2 rounded-full hover:bg-orange-600"
        >
          Book Now
        </button> */}
          <div className="mt-4">
            <CustomButton
              content={'Book Now'}
              btncolor={light.buttonBackground}
              small_btn={false}
              md_round={false}
              pill_rounded={true}
              padding="p-[11px]"
              onClick={() => navigate(`/itinerary/${routeName}`)}
            />
          </div>
        </div>
      </div>
      <div
        onClick={() => navigate(`/itinerary/${routeName}`)}
        className="  flex w-[250px] mb-2 max-h-[450px] shrink-0 flex-col  items-center gap-y-6 overflow-hidden rounded-xl bg-white   p-2 shadow-lg md:hidden"
      >
        {/* Image */}
        <div className="relative w-full">
          <img
            className=" h-44 w-full rounded-xl object-cover"
            src={image}
            alt={title}
          />
          <div
            style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)' }}
            className="absolute -bottom-8 left-1/2 min-w-fit -translate-x-1/2 -translate-y-1/2 text-nowrap rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-gray-600"
          >
            ₹{price} onwards {/* Dynamic price */}
          </div>
        </div>

        <div className="w-full px-1">
          {/* Title and Rating */}
          <div className="flex items-center justify-between">
            <div
              className="truncate  text-xl"
              style={{
                maxWidth: '13rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {title}
            </div>{' '}
            {/* Dynamic title with ellipsis */}
            <div className="flex items-center text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354a4.354 4.354 0 110 8.708 4.354 4.354 0 010-8.708z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9a4.358 4.358 0 00-4.354 4.354h8.708A4.358 4.358 0 0012 9z"
                />
              </svg>
              {/* Dynamic rating */}
              <span className="ml-1 font-medium text-gray-700">{rating}</span>
            </div>
          </div>

          {/* Price */}

          {/* Duration and Location */}
          <div className="my-1 flex  overflow-hidden  items-center gap-x-3   text-xs text-nowrap text-gray-500">
            <span>{duration + ' days & ' + (duration - 1) + ' Nights'} </span>|
            <span title={location}>{location}</span>
            {/* Dynamic duration and location */}
          </div>

          {/* Description */}
          <div className="mt-1.5  h-14 text-xs text-gray-700">
            {description} {/* Dynamic description */}
          </div>

          {/* Button */}
          {/* <button
          onClick={() => navigate(`/itinerary/${id}`)}
          className="w-full mt-8 bg-orange-500 text-white font-semibold py-2 rounded-full hover:bg-orange-600"
        >
          Book Now
        </button> */}
          <div className="mt-8 mb-2">
            <CustomButton
              content={'Book Now'}
              btncolor={light.buttonBackground}
              small_btn={false}
              md_round={false}
              pill_rounded={true}
              padding="p-[11px]"
              onClick={() => navigate(`/itinerary/${id}`)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ItenerereyCard
