// "use client"
// import { useEffect, useState } from 'react'
// // import { useRouter } from 'next/router'


// import { useDispatch, useSelector } from 'react-redux'

// import Head from 'next/head' // Replaces react-helmet-async
// import { fetchItenerayByName } from '@/lib/thunks/fetchItenerayByName'
// import CustomModal from '@/components/CustomModal'
// import BannerSlider from '@/components/User/HomePage/banners/BannerSlider'
// import ReviewSection from '@/components/User/HomePage/reviewSection/ReviewSection'
// import PartnersSection from '@/components/User/explorePage/PartnersSection'
// import FeaturesIcons from '@/components/User/itineraryPage/featureIcons'
// import ItenerayImageSection from '@/components/User/itineraryPage/itenerayImageSection'
// import ItinerarySection from '@/components/User/itineraryPage/ItinerarySection'
// import PricingComponent from '@/components/User/itineraryPage/PricingSection'
// import TripPdfDownloadBanner from '@/components/User/itineraryPage/TripPdfDownloadBanner'
// import { useParams } from 'next/navigation'

// const ItineraryPage = () => {
//   const dispatch = useDispatch()
//   const params = useParams()
// //   const { id } = router.query // Get dynamic ID from URL
//   const {id} = params;
//   const iteneray = useSelector((state) => state.global.itenerayByID) || []

//   const [showCallBackForm, setShowCallBackForm] = useState(false)
//   const [isPopupOpen, setIsPopupOpen] = useState(false)

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchItenerayByName(id));
//       console.log("Fetched data for ID:", id);
//     }
//   }, [dispatch, id]);
// //   if (!id) {
// //     return <p>Loading...</p>; // Show a loading state until `id` is available
// //   }



//   return (
//     <div>
//       <Head>
//         <title>{iteneray.title || 'Itinerary Details'} - Safar Wanderlust</title>
//         <meta name="description" content={iteneray.description || 'Explore detailed itineraries for your dream destinations with Safar Wanderlust.'} />
//         <meta property="og:title" content={iteneray.title || 'Itinerary Details'} />
//         <meta property="og:url" content={`https://yourdomain.com/itinerary/${id}`} />
//       </Head>

//       <ItenerayImageSection allImages={iteneray.allImages} title={iteneray.title} description={iteneray.description} city={iteneray.city} />
//       <FeaturesIcons altitude={iteneray.altitude} cultural_sites={iteneray.cultural_sites} duration={iteneray.duration} scenery={iteneray.scenery} />
//       <PricingComponent
//         selectedBatch=""
//         showCallBackForm={showCallBackForm}
//         setShowCallBackForm={setShowCallBackForm}
//         base_packages={iteneray.base_packages}
//         batches={iteneray.batches}
//         drop_point={iteneray.drop_point}
//         pickup_point={iteneray.pickup_point}
//       />
//       <TripPdfDownloadBanner pdfLink={iteneray.itin_pdf} />
//       <ItinerarySection notes={iteneray.notes} dayDetails={iteneray.day_details} hotels={iteneray.hotels} inclusions_exclusions={iteneray.inclusions_exclusions} cancellation_policy={iteneray.cancellation_policy} />
      
//       <CustomModal open={isPopupOpen} handleClose={() => setIsPopupOpen(false)} title={<span>Add Traveller Information</span>} />
//       <BannerSlider />
//       <PartnersSection />
//       {iteneray && <ReviewSection page="itinerary" itineraryId={iteneray.id} />}
//     </div>
//   )
// }

// export default ItineraryPage

"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { fetchItenerayByName } from "@/lib/thunks/fetchItenerayByName";
import CustomModal from "@/components/CustomModal";
import BannerSlider from "@/components/User/HomePage/banners/BannerSlider";
import ReviewSection from "@/components/User/HomePage/reviewSection/ReviewSection";
import PartnersSection from "@/components/User/explorePage/PartnersSection";
import FeaturesIcons from "@/components/User/itineraryPage/featureIcons";
import ItenerayImageSection from "@/components/User/itineraryPage/itenerayImageSection";
import ItinerarySection from "@/components/User/itineraryPage/ItinerarySection";
import PricingComponent from "@/components/User/itineraryPage/PricingSection";
import TripPdfDownloadBanner from "@/components/User/itineraryPage/TripPdfDownloadBanner";
import { useParams } from "next/navigation";

const ItineraryPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const iteneray = useSelector((state) => state.global.itenerayByID) || [];

  const [showCallBackForm, setShowCallBackForm] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const [selectedBatch, setSelectedBatch] = useState('')
  const [selectedPackage, setSelectedPackage] = useState(null) // State for selected package
  const [selectedStartingPoint, setSelectedStartingPoint] = useState(null) // State for full selected starting point object
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState(null) // State for full selected dropping point object
  useEffect(() => {
    if (id) {
      dispatch(fetchItenerayByName(id));
      console.log("Fetched data for ID:", id);
    }
  }, [dispatch, id]);

  return (
    <div>
      <Head>
        <title>{iteneray.title || "Itinerary Details"} - Safar Wanderlust</title>
        <meta
          name="description"
          content={
            iteneray.description ||
            "Explore detailed itineraries for your dream destinations with Safar Wanderlust."
          }
        />
        <meta property="og:title" content={iteneray.title || "Itinerary Details"} />
        <meta property="og:url" content={`https://yourdomain.com/itinerary/${id}`} />
      </Head>

      {/* Image & Feature Icons Section */}
      <ItenerayImageSection
        allImages={iteneray.allImages}
        title={iteneray.title}
        description={iteneray.description}
        city={iteneray.city}
      />
      <FeaturesIcons
        altitude={iteneray.altitude}
        cultural_sites={iteneray.cultural_sites}
        duration={iteneray.duration}
        scenery={iteneray.scenery}
      />

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Content Section */}
        <div className="w-full lg:w-3/4 lg:pr-6">
          <ItinerarySection
            notes={iteneray.notes}
            dayDetails={iteneray.day_details}
            hotels={iteneray.hotels}
            inclusions_exclusions={iteneray.inclusions_exclusions}
            cancellation_policy={iteneray.cancellation_policy}
          />
        </div>

        {/* Right Pricing Section (Sticky + Scrollable) */}
        <div className="w-full lg:w-1/4 sticky top-0 h-screen overflow-y-auto flex flex-col bg-white shadow-lg ">
          {/* Pricing Component */}
          <PricingComponent
            selectedBatch=""
            showCallBackForm={showCallBackForm}
            setShowCallBackForm={setShowCallBackForm}
            selectedDroppingPoint={selectedDroppingPoint}
            selectedPackage={selectedPackage}
            selectedStartingPoint={selectedStartingPoint}
            setSelectedBatch={setSelectedBatch}
            setSelectedDroppingPoint={setSelectedDroppingPoint}
            setSelectedPackage={setSelectedPackage}
            setSelectedStartingPoint={setSelectedStartingPoint}
            base_packages={iteneray.base_packages}
            batches={iteneray.batches}
            drop_point={iteneray.drop_point}
            pickup_point={iteneray.pickup_point}
          />

          {/* Trip PDF Download Banner at Bottom */}
          <div className="flex flex-col justify-center items-center h-full w-full">
            <TripPdfDownloadBanner pdfLink={iteneray.itin_pdf} />
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <CustomModal
        open={isPopupOpen}
        handleClose={() => setIsPopupOpen(false)}
        title={<span>Add Traveller Information</span>}
      />
      <BannerSlider />
      <PartnersSection />
      {iteneray && <ReviewSection page="itinerary" itineraryId={iteneray.id} />}
    </div>
  );
};

export default ItineraryPage;
