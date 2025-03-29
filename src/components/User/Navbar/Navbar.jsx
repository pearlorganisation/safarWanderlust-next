"use client"

import React, { useEffect, useState } from 'react'

// import { SlLocationPin } from 'react-icons/sl'
import { GoSearch } from 'react-icons/go'


import Toggle from '@/components/TogelButton'
import OfferBar from './OfferBar'
import SearchBar from './SearchBar'
// import TripForm from './TripForm'
// import DropdownTrending from '@/components/DropdownTrending'
// import DropdownCategory from '@/components/DropdownCategory'
import CustomModal from '@/components/CustomModal'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNavbarCategories } from '@/lib/thunks/fetchNavBarCategories'
import { fetchTrendingItineraries } from '@/lib/thunks/fetchTrendingItineraries'
// import MobileMenu from './MobileMenu'
import { RxCross2 } from 'react-icons/rx'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CustomLogo from './CustomLogo'




const Navbar = () => {
  const router = useRouter()

  const [state, setState] = useState({
    isToggled: false,
    expanded: false,
    expandedMobile: false,
   
    isDropdownOpen: false,
    showForm: false,
    isTreddingDropdownOpen: false,
    isSticky: false // New state to track sticky status
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNavbarCategories())
    dispatch(fetchTrendingItineraries())

    // Add scroll listener to detect when the navbar should become sticky
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setState((prevState) => ({ ...prevState, isSticky: true }))
      } else {
        setState((prevState) => ({ ...prevState, isSticky: false }))
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [dispatch])

  const navBarCategories =
    useSelector((state) => state.global.NavBarCategories) || []
  const trendingItineraries =
    useSelector((state) => state.global.trendingItineraries) || []

  const handleToggle = () => {
    setState((prevState) => ({
      ...prevState,
      showForm: !prevState.showForm,
      isToggled: !prevState.isToggled
    }))
  }

  return (
    <>
      <OfferBar />
      <div className="bg-white z-50 mx-14 border-b border-gray-300 sm:block md:block hidden">
        <div className="mx-auto flex flex-col justify-between ">
          <div className="flex pt-3 pb-3 border-gray-400 items-center justify-between">
            {/* <img
              onClick={() => router.push('/')}
              className="h-[66px] w-[136px]"
              src={Logo}
              alt="Safar Wanderlust"
            /> */}
            <div onClick={() => router.push('/')}>
              <CustomLogo />
            </div>
            <div className="w-full max-w-2xl">
              <SearchBar
                expanded={state.expanded}
                setExpanded={(value) =>
                  setState((prevState) => ({ ...prevState, expanded: value }))
                }
              />
            </div>
            <div className="flex items-center mr-5">
              {/* <SlLocationPin size={22} />
              <span className="ml-1">Mumbai</span> */}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navbar */}
      <nav
        className={`sticky top-5 z-[99] bg-white transition-all sm:block md:block hidden ${
          state.isSticky
            ? 'shadow-md rounded-full mx-[11%] '
            : 'px-14 border-b-[1px] py-2'
        }`}
      >
        <div className="flex pl-1 h-full pr-1 pt-2 pb-2 items-center justify-between space-6">
          <div className="pl-4 h-full flex items-center gap-14">
            {/* Conditionally showing the logo when the navbar is sticky */}
            {state.isSticky && (
              // <img
              //   onClick={() => router.push('/')}
              //   className="h-[20px] w-[40px] object-cover mr-6 transition-opacity duration-300"
              //   src={Logo}
              //   alt="Safar Wanderlust"
              // />
              <div onClick={() => router.push('/')}>
                <CustomLogo logoOnly={true} imageStyle="md:h-9 md:w-7" />
              </div>
            )}

            <Link
              href="/categories"
              onMouseEnter={() =>
                setState((prevState) => ({
                  ...prevState,
                  isDropdownOpen: true
                }))
              }
              onMouseLeave={() =>
                setState((prevState) => ({
                  ...prevState,
                  isDropdownOpen: false
                }))
              }
              className="font-extrabold h-full inline-block"
            >
              Explore
            </Link>

            {state.isDropdownOpen && (
              <div
                className={`absolute    bg-white shadow-lg p-5 gap-6 rounded-lg z-[99] transition-all duration-300 ease-in-out transform ${
                  state.isDropdownOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2'
                } ${
                  state.isSticky
                    ? 'w-[93%] top-9 left-12'
                    : 'w-[95%] top-10 left-10'
                }`}
                onMouseEnter={() =>
                  setState((prevState) => ({
                    ...prevState,
                    isDropdownOpen: true
                  }))
                }
                onMouseLeave={() =>
                  setState((prevState) => ({
                    ...prevState,
                    isDropdownOpen: false
                  }))
                }
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold">Categories</div>
                  <div>
                    <button
                      onClick={() => router.push('/categories')}
                      className="flex items-center justify-center text-sm p-2 transition duration-300 hover:rounded-full"
                    >
                      <span className="mr-2">Show More</span>
                      <span className="bg-orange-500 p-1 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {/* {navBarCategories.map((data, index) => (
                    <DropdownCategory
                      emoji={data.image}
                      items={data.itinerary}
                      title={data.name}
                      key={index}
                      setState={setState}
                    />
                  ))} */}
                </div>
              </div>
            )}

            <Link
              href="/trending"
              onMouseEnter={() =>
                setState((prevState) => ({
                  ...prevState,
                  isTreddingDropdownOpen: true
                }))
              }
              onMouseLeave={() =>
                setState((prevState) => ({
                  ...prevState,
                  isTreddingDropdownOpen: false
                }))
              }
              className="text-gray-700"
            >
              Trending
            </Link>

            {state.isTreddingDropdownOpen && (
              <div
                onMouseEnter={() =>
                  setState((prevState) => ({
                    ...prevState,
                    isTreddingDropdownOpen: true
                  }))
                }
                onMouseLeave={() =>
                  setState((prevState) => ({
                    ...prevState,
                    isTreddingDropdownOpen: false
                  }))
                }
                className={`absolute bg-white  shadow-lg p-5 rounded-lg z-[99]
                   ${
                     state.isSticky
                       ? 'w-[93%] top-9 left-12'
                       : 'w-[95%] top-10 left-10'
                   }`}
              >
                {/* <DropdownTrending

                  title="Trending"
                  emoji="📈"
                  items={trendingItineraries?.slice(0, 12)}
                  setState={setState}
                  
                /> */}
              </div>
            )}

            {/* <Link href="/about" className="text-gray-700">
              About Us
            </Link> */}
          </div>
          <div className="flex items-center">
            <span
              className={`mr-3 ${
                state.isToggled ? 'font-nunitobold700' : 'font-nunitoregular400'
              }`}
            >
              Customize Trip
            </span>

            <Toggle enabled={state.isToggled} onToggle={handleToggle} />
          </div>
        </div>

        {/* Conditionally showing the search bar when navbar is sticky */}
      </nav>

      <div className="md:hidden sm:hidden flex justify-between  items-center px-5 ">
        {/* <img
          onClick={() => router.push('/')}
          className="w-20 acpact"
          src={Logo}
          alt="Logo"
        /> */}
        <div onClick={() => router.push('/')}>
          <CustomLogo logoOnly={true} className="w-full" />
        </div>
        <div className="flex w-full items-center justify-end">
          <div
            className="mx-4"
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                expandedMobile: true
              }))
            }
          >
            <GoSearch size={23} />
          </div>
          <CustomModal
            padding={3}
            open={state.expandedMobile}
            // handleClose={() => {
            //   setState((prevState) => ({
            //     ...prevState,
            //     expandedMobile: false
            //   }))
            // }}
            restContent={
              <div className=" relative w-[65vw] ">
                <div className="absolute -right-5 -top-5 z-[999] ">
                  <div
                    className="p-2"
                    onClick={() => {
                      setState((prevState) => ({
                        ...prevState,
                        expandedMobile: false
                      }))
                    }}
                  >
                    <RxCross2 size={30} color="black" />
                  </div>
                </div>

                <SearchBar
                  expanded={state.expandedMobile}
                  setExpanded={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      expandedMobile: value
                    }))
                  }
                />
              </div>
            }
          />

          <div className=" overflow-hidden">
            {/* <MobileMenu setStateParent={setState} /> */}
          </div>
        </div>
      </div>

      <CustomModal
      padding={4}
        title={
          <h1 className="md:text-4xl text-xl text-center mb-2">
            Customize <span className="text-black font-bold">Trip</span> 🔥
          </h1>
        }
        description={
          <p className="text-center md:w-[50%] mx-auto mb-6 text-gray-600">
            Tailor your journey with personalized itineraries, activities, and
            experiences.
          </p>
        }
        open={state.showForm}
        handleClose={() =>
          setState((prevState) => ({
            ...prevState,
            showForm: false,
            isToggled: false
          }))
        }
        restContent={
          <div className="w-[60vw]">
            {/* <TripForm state={state} setState={setState} /> */}
          </div>
        }
      />
    </>
  )
}

export default Navbar
