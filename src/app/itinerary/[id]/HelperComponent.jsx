"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head"; // Keep if you intend to use it, otherwise remove
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
import TravellerForm from "@/components/User/itineraryPage/TravellerForm";

// A simple loader component (you can replace this with a spinner or a more complex skeleton loader)
const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <p className="text-2xl font-semibold">Loading itinerary...</p>
    {/* You could add a spinner SVG or component here */}
  </div>
);

const ItineraryPage = ({ldData}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  
  // It's generally better to default to null or an empty object if you expect an object,
  // rather than an empty array, if itenerayByID is an object.
  // Let's assume it's an object.
  const iteneray = useSelector((state) => state.global.itenerayByID) || {};

  const [isLoading, setIsLoading] = useState(true); // Initialize loading to true
  const [showCallBackForm, setShowCallBackForm] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedStartingPoint, setSelectedStartingPoint] = useState(null);
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState(null);
  
  function openPopup() {
     setIsPopupOpen((prev)=> !prev);
  }
  const closePopup = () => {
    setIsPopupOpen(false);
    setShowCallBackForm(true);
  }

  useEffect(() => {
    if (id) {
      setIsLoading(true); // Set loading to true before dispatching
      dispatch(fetchItenerayByName(id))
        .then((response) => { // Assuming fetchItenerayByName returns a promise that resolves after fetching
          console.log("Fetched data for ID:", id, response);
          // Data is now in Redux store, useSelector will trigger a re-render
        })
        .catch((error) => {
          console.error("Failed to fetch itinerary:", error);
          // Optionally, you could set an error state here to display an error message
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false after the fetch attempt is complete
        });
    } else {
      setIsLoading(false); // If there's no ID, nothing to load
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }

  // It's good practice to check if essential data exists before trying to render it,
  // especially after loading is done.
  // This handles cases where 'id' was present, loading finished, but 'iteneray' is still empty or undefined.
  if (!iteneray || Object.keys(iteneray).length === 0 && id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold">Itinerary not found or data is unavailable.</p>
      </div>
    );
  }


  return (
    <div>
    <Head>

      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ldData),
        }}
      />

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
      <div className="grid lg:grid-cols-[65%_35%]">
        {/* Left Content Section */}
        <div>
          <ItinerarySection
            notes={iteneray.notes}
            dayDetails={iteneray.day_details}
            hotels={iteneray.hotels}
            inclusions_exclusions={iteneray.inclusions_exclusions}
            cancellation_policy={iteneray.cancellation_policy}
          />
        </div>

        {/* Right Pricing Section (Sticky + Scrollable) */}
        <div className="min-h-screen justify-start md:p-2 sticky top-0 h-full md:h-max flex flex-col bg-gray-900 shadow-lg">
          <PricingComponent
           openPopup={openPopup}
            selectedBatch={selectedBatch}
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

          <div className="flex flex-col justify-center items-center">
            <TripPdfDownloadBanner pdfLink={iteneray.itin_pdf} />
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <CustomModal
        open={isPopupOpen}
        handleClose={() => setIsPopupOpen(false)}
        title={<span>Add Traveller Information</span>}
        description = "The information you fill below is needed to quote and book your trip."
        restContent={   
        <div className="w-[65vw] max-w-screen-xl">
            <TravellerForm
              isOpen={isPopupOpen}
              onClose={closePopup}
              base_packages={iteneray.base_packages}
              drop_point={iteneray.drop_point}
              pickup_point={iteneray.pickup_point}
              selectedBatch={selectedBatch}
              selectedDroppingPoint={selectedDroppingPoint}
              selectedPackage={selectedPackage}
              selectedStartingPoint={selectedStartingPoint}
            />
          </div>}
      />
      <BannerSlider />
      <PartnersSection />
      {/* Ensure iteneray.id exists before rendering ReviewSection if it depends on it */}
      {iteneray && iteneray.id && <ReviewSection page="itinerary" itineraryId={iteneray.id} />}
    </div>
  );
};

export default ItineraryPage;