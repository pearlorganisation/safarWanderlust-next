"use client";
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Logo from '@/_assets/svgs/logo/Safarlogo.svg';
import Image from 'next/image';

const Footer = () => {
  return (
    <>
      {' '}
      <footer className="bg-gray-900 text-white py-8 md:block  hidden">
        <div className="container mx-auto text-center">
          {/* Navigation Links */}
          <div className="flex justify-between items-end">
            <div className="flex items-end justify-end h-20 object-cover">
              <Image className="  w-[163px] object-cover" src={Logo} alt="" />
            </div>
            <div className="flex justify-center font-titleRegular space-x-8 mb-4">
              <a href="/" className="text-white hover:underline">
                Home
              </a>
              {/* <a href="/about" className="text-white hover:underline">
                About
              </a> */}
              <a href="/explore" className="text-white hover:underline">
                Explore
              </a>
              <a
                href="/term_and_conditions"
                className="text-white hover:underline"
              >
                T&C
              </a>
              <a href="/privacy" className="text-white hover:underline">
                Privacy Policy
              </a>
            </div>

            <div className=" flex-wrap flex  justify-center space-x-4 mb-4">
              <a
                href="https://www.facebook.com/safarwanderlust/"
                className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com/SafarWanderlust/"
                className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/safar_wanderlust/"
                className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://in.linkedin.com/company/safar-wanderlust/"
                className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-700 my-4"></div>
          <p className="text-sm font-titleRegular text-gray-400">
            COPYRIGHT © 2023 SAFAR WANDERLUST <br /> ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
      <footer className="bg-gray-900 py-4 text-white md:hidden  w-full block">
        <div className=" py-4 px-8 flex justify-between items-center border-b-2 border-gray-400 ">
          <div className=" flex flex-col items-center justify-center">
            <Image className="h-20 w-full " src={Logo} alt="" />
            <div className="flex  justify-center space-x-2 my-4">
              <a
                href="https://www.facebook.com/safarwanderlust/"
                className=" p-2 bg-white rounded-lg hover:bg-gray-700 transition duration-300"
              >
                <FaFacebookF size={10} />
              </a>
              <a
                href="https://twitter.com/SafarWanderlust"
                className=" p-2 bg-white rounded-lg hover:bg-gray-700 transition duration-300"
              >
                <FaTwitter size={10} />
              </a>
              <a
                href="https://www.instagram.com/safar_wanderlust/"
                className="p-2 bg-white rounded-lg hover:bg-gray-700 transition duration-300"
              >
                <FaInstagram size={10} />
              </a>
              <a
                href="https://in.linkedin.com/company/safar-wanderlust"
                className="p-2 bg-white rounded-lg hover:bg-gray-700 transition duration-300"
              >
                <FaLinkedinIn size={10} />
              </a>
            </div>
          </div>
          <div className="flex flex-col font-titleRegular justify-center text-right mb-4">
            <a href="/" className="text-white hover:underline">
              Home
            </a>
            {/* <a href="/about" className="text-white hover:underline">
              About
            </a> */}
            <a href="/explore" className="text-white hover:underline">
              Explore
            </a>
            <a
              href="/term_and_conditions"
              className="text-white hover:underline"
            >
              T&C
            </a>
            <a href="#" className="text-white hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="py-4">
          <p className="text-sm text-center font-titleRegular text-gray-400 ">
            ©2023 SAFAR WANDERLUST
            <br /> ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </>
  )
};

export default Footer;
