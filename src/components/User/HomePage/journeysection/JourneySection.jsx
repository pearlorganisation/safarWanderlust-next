"use client"

import React from 'react'
import Image from "next/image";

import MapIcon from '@/_assets/svgs/user/MapIcon.svg'
import BackpackIcon from '@/_assets/svgs/user/backpack_icon.webp'
import TentIcon from '@/_assets/svgs/user/camping_tent_icon.webp'
import Icon1 from '@/_assets/svgs/user/personalized_itineraries.svg'
import Memories from '@/_assets/svgs/user/lasting_memory.svg'
import PerfectTrip from '@/_assets/svgs/user/perfect_trip.svg'
import SeamlessTravel from '@/_assets/svgs/user/seamless_travel.svg'
import LeftFoot from '@/_assets/svgs/user/Left_Foot.svg'
import RightFoot from '@/_assets/svgs/user/Right_Foot.svg'
import Icon2 from '@/_assets/svgs/user/seamless_experience.svg'
import Icon3 from '@/_assets/svgs/user/seamless_experience.svg'
import Icon4 from '@/_assets/svgs/user/unforgettable_memories.svg'

const JourneySection = () => {
  return (
    <div className=" mb-6 mt-10 ">
      <div className="relative text-center">
        {/* <div
          className=" h-4/5 bg-auto bg-center bg-no-repeat "
          style={{
            backgroundImage: `url(${MapIcon})`
          }}
        > */}
        <div className="relative">
          <Image src={MapIcon} alt="Map Icon" layout="fill" objectFit="cover" />
          <div>
            <h2 className="mx-auto font-titleMedium text-2xl md:text-5xl">
              Experiences that Last
              <span className="text-orange-500"> Beyond </span>the Trip
            </h2>

            <div className="mt-10  md:mx-20">
              <div className=" flex h-[32%] flex-col items-center justify-center  sm:flex-col md:mb-20 md:flex-row ">
                <div className=" mb-8 flex flex-col items-center justify-center text-center sm:mb-8 md:mb-0">
                  <Image className="my-2.5" src={Memories} alt="" />

                  <h2 className="mb-2 text-xl  font-bold md:text-2xl ">
                    Shared Moments, Amplified Joy
                  </h2>
                  <p className="w-auto  whitespace-pre-line text-xs md:w-[50%]">
                    {`Every adventure is better when shared. From the first step to the last laugh, group travel turns ordinary trips into extraordinary memories, sparking joy that lingers.`}
                  </p>
                </div>
                <div className=" mb-8 flex flex-col items-center justify-center text-center sm:mb-8 md:mb-0">
                  <Image className="my-2.5" src={PerfectTrip} alt="" />
                  <h2 className="mb-2 text-xl  font-bold md:text-2xl ">
                    Connections That Go Deeper
                  </h2>
                  <p className="w-auto whitespace-pre-line text-xs md:w-[50%]">
                    {`Our journeys are designed to bring people together. Through shared experiences, each traveler becomes part of a story, creating bonds that feel like they were always meant to be.`}
                  </p>
                </div>
                <div className="  mx-auto  flex flex-col items-center justify-center text-center md:hidden">
                  <Image className="my-2.5" src={SeamlessTravel} alt="" />
                  <h2 className="mb-2 text-xl font-bold md:text-2xl ">
                    Memories That Stay Long After
                  </h2>
                  <p className="whitespace-pre-line text-xs ">
                    {`It’s not just about where we go; it’s about the lasting impact. Each journey leaves behind stories, friendships, and experiences that live on, well beyond the trip.`}
                  </p>
                </div>
              </div>
              <div className="hidden h-[32%] md:block ">
                <div className=" mx-auto flex flex-col items-center justify-center text-center">
                  <Image className="my-2.5" src={SeamlessTravel} alt="" />
                  <h2 className="mb-2 text-xl font-bold md:text-2xl ">
                    Memories That Stay Long After
                  </h2>
                  <p className="w-auto whitespace-pre-line text-xs md:w-[23%]">
                    {`It’s not just about where we go; it’s about the lasting impact. Each journey leaves behind stories, friendships, and experiences that live on, well beyond the trip.`}
                  </p>
                </div>
                <div className="absolute bottom-[7.5%] left-[29.5%] hidden object-cover sm:hidden md:block">
                  <Image src={LeftFoot} alt="" />
                </div>
                <div className="absolute bottom-[8.5%] right-[30.4%] hidden object-cover sm:hidden md:block">
                  <Image src={RightFoot} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-1 mt-10  flex items-center justify-between rounded-3xl bg-gray-200 px-2  py-10 sm:mx-4 md:mx-40 md:mt-24">
        {/* Features Section */}

        <div className="absolute -left-32 hidden sm:hidden md:block  ">
          <Image className="h-60 w-60" src={BackpackIcon} alt="" />
        </div>
        <div className="absolute -right-36 -top-28 hidden sm:hidden md:block ">
          <Image className="h-60 w-60" src={TentIcon} alt="" />
        </div>
        <div className="no-scrollbar  ml-0 flex flex-row space-x-4 space-y-0 overflow-x-scroll sm:ml-0 md:ml-20 ">
          <FeatureCard
            icon={Icon1}
            title="Hassle-Free Experience"
            description="We manage every detail to ensure a smooth, enjoyable journey."
          />
          <div className="min-h-full min-w-[0.5px] bg-buttonBackground"></div>
          <FeatureCard
            icon={Icon2}
            title="Expert Trip Planning"
            description=" Every detail is flawlessly organized by our experienced team"
          />
          <div className="min-h-full min-w-[0.5px] bg-buttonBackground"></div>{' '}
          <FeatureCard
            icon={Icon3}
            title="70% Returning Clients"
            description="Satisfied clients choose to travel with us again."
          />
          <div className="min-h-full min-w-[0.5px] bg-buttonBackground"></div>{' '}
          <FeatureCard
            icon={Icon4}
            title="New Friendships & Memories"
            description="Meet like-minded travelers and form lifelong friendships."
          />
        </div>

        {/* Tent Icon */}
      </div>
    </div>
  )
}

// FeatureCard component for reusable feature cards
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="text-left ">
      <div className="mb-4 flex justify-start">
        <Image src={icon} alt="" />
      </div>
      <h4 className="mb-2 text-xl font-semibold">{title}</h4>
      <p className="w-[55vw] text-justify text-sm text-gray-600 md:w-auto">
        {description}
      </p>
    </div>
  )
}

export default JourneySection
