import React from 'react'
import Logo from '@/_assets/svgs/logo/safar_wanderlust_bag_icon.webp'


function CustomLogo({logoOnly,className='',imageStyle=''}) {
  return (
    <div
      className={` flex justify-start  items-center ${className}`}
      style={{ cursor: 'pointer' }}
    >
      <img
        className={`object-center  h-14 aspect-square w-12 md:h-16 ${imageStyle}`}
        src={Logo}
        alt=""
      />
      {!logoOnly && (
        <div className="">
          <h1
            className="font-nunitobold700 lg:text-lg md:text-xs lg:block sm:hidden "
            style={{ maxWidth: '10rem' ,  letterSpacing: '0.01rem'}}
          >
            Safar Wanderlust
          </h1>
          <p
            className="lg:text-xs md:text-[8px]  lg:block sm:hidden  hidden "
            style={{ maxWidth: '10rem', letterSpacing: '' }}
          >
            GROUP TRAVEL COMPANY
          </p>
        </div>
      )}
    </div>
  )
}

export default CustomLogo