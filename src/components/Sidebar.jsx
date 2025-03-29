// src/components/Sidebar.jsx
import { light } from '../assets/themes/themes'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import safarlogoimg from '../assets/svgs/logo/Safar_Final_Logo.svg'
import CustomText from './CustomText'
import Itinerary from '../assets/svgs/logo/Itinerary'
import Category from '../assets/svgs/logo/Category'
import Content from '../assets/svgs/logo/Content'
import Bookings from '../assets/svgs/logo/Bookings'
import Requests from '../assets/svgs/logo/Requests'
import Settings from '../assets/svgs/logo/Settings'
import Dashboard from '../assets/svgs/logo/Dashboard'
import { MdRateReview } from 'react-icons/md'

const Sidebar = ({ onHover, isOpen }) => {
  const location = useLocation()
  let location_change = location.pathname
  const [activePage, setActivePage] = useState(location.pathname)
  useEffect(() => {
    setActivePage(location_change)
  }, [location_change])

  const NavItem = ({ path, Logo_path, title }) => {
    const isActive = activePage === path
    const [itemstate, setitemstate] = useState({ is_hovering: false })
    return (
      <Link
        onMouseEnter={() =>
          setitemstate((prevs) => ({ ...prevs, is_hovering: true }))
        }
        onMouseLeave={() =>
          setitemstate((prevs) => ({ ...prevs, is_hovering: false }))
        }
        onClick={() => setActivePage(path)}
        to={path}
        className={`hover:bg-signinbtnbackground hover:text-white ${
          isActive ? 'bg-signinbtnbackground text-white' : ''
        } p-3 rounded ml-2 select-none`}
      >
        <div className="flex relative">
          <div
            className={`${
              itemstate.is_hovering || isActive
                ? 'bg-signinbtnbackground'
                : 'bg-white'
            }  rounded-br rounded-tr py-[1.29rem] px-[0.15rem] absolute -left-9 -top-[0.70rem]`}
          />
          <div className="flex">
            <div className="mr-3">
              <Logo_path
                color={
                  itemstate.is_hovering || isActive
                    ? 'white'
                    : light.sidebarborder
                }
              />
            </div>

            <CustomText fontsize="16px" content={title} />
          </div>
        </div>
      </Link>
    )
  }
  return (
    <div
      style={{ borderRight: '1px solid #3F3F441A' }}
      className={`sm:block hidden fixed top-0 left-0 w-64 h-full bg-white text-black  flex-col p-4 transition-transform duration-300 z-40 'translate-x-0 '
       `}
      // ${
      //     isOpen ? 'translate-x-0' : '-translate-x-full'
      //   }
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <img
        src={safarlogoimg}
        alt="logo"
        className=" w-40 h-40 self-center object-contain object-center"
      />
      <nav className="flex flex-col space-y-2">
        <NavItem
          path={'/Admin/Dashboard'}
          Logo_path={Dashboard}
          title={'Dashboard'}
        />
        <NavItem
          path={'/Admin/Itinerary'}
          Logo_path={Itinerary}
          title={'Itinerary'}
        />
        <NavItem
          path={'/Admin/Category'}
          Logo_path={Category}
          title={'Category'}
        />
        <NavItem
          path={'/Admin/Content'}
          Logo_path={Content}
          title={'Contents'}
        />
        <NavItem
          path={'/Admin/Review'}
          Logo_path={MdRateReview}
          title={'Review'}
        />
        <NavItem
          path={'/Admin/Bookings'}
          Logo_path={Bookings}
          title={'Bookings'}
        />
        <NavItem
          path={'/Admin/Request'}
          Logo_path={Requests}
          title={'Requests'}
        />
        <NavItem
          path={'/Admin/AdminPage'}
          Logo_path={Settings}
          title={'Admins'}
        />
      </nav>
    </div>
  )
}

export default Sidebar
