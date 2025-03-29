import React, { useEffect, useState } from 'react'
import ItenerayImageSection from './itenerayImageSection'
import ItinerarySection from './ItinerarySection'
import TripPdfDownloadBanner from './TripPdfDownloadBanner'
import PricingComponent from './PricingSection'
import BannerSlider from '../HomePage/banners/BannerSlider'
import Testimonial from '../HomePage/reviewSection/ReviewSection'
import PartnersSection from '../explorePage/PartnersSection'
import TravellerForm from './TravellerForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItenerayByName } from '../../../redux/thunks/fetchItenerayByName'
import FeaturesIcons from './featureIcons'
import CustomModal from '../../../components/CustomModal'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function ItineraryPage() {
  const dispatch = useDispatch()
  const iteneray = useSelector((state) => state.global.itenerayByID) || []
  const [showCallBackForm, setShowCallBackForm] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchItenerayByName(id))
  }, [dispatch, id])

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const openPopup = () => {
    setIsPopupOpen(true) // Open popup
  }

  const closePopup = () => {
    setIsPopupOpen(false) // Close popup
    setShowCallBackForm(true)
  }

  const [selectedBatch, setSelectedBatch] = useState('')
  const [selectedPackage, setSelectedPackage] = useState(null) // State for selected package
  const [selectedStartingPoint, setSelectedStartingPoint] = useState(null) // State for full selected starting point object
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState(null) // State for full selected dropping point object

  return (
    <div>
      <Helmet>
        <title>
          {iteneray.title || 'Itinerary Details'} - Safar Wanderlust
        </title>
        <meta
          name="description"
          content={
            iteneray.description ||
            'Explore detailed itineraries for your dream destinations with Safar Wanderlust.'
          }
        />
        <meta
          name="keywords"
          content={`itinerary, ${iteneray.city || ''}, ${iteneray.title || ''}`}
        />
        <meta name="author" content="Safar Wanderlust" />
        <meta
          property="og:title"
          content={iteneray.title || 'Itinerary Details'}
        />
        <meta
          property="og:description"
          content={
            iteneray.description ||
            'Discover exciting travel plans and explore breathtaking destinations with Safar Wanderlust.'
          }
        />
        {iteneray.allImages && iteneray.allImages[0] && (
          <meta property="og:image" content={iteneray.allImages[0]} />
        )}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

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
      <TripPdfDownloadBanner pdfLink={iteneray.itin_pdf} />
      <ItinerarySection
        notes={iteneray.notes}
        dayDetails={iteneray.day_details}
        hotels={iteneray.hotels}
        inclusions_exclusions={iteneray.inclusions_exclusions}
        cancellation_policy={iteneray.cancellation_policy}
      />
      <PricingComponent
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
        openPopup={openPopup}
      />
      <CustomModal
        open={isPopupOpen}
        backdropvalue="0.1"
        handleClose={closePopup}
        title={
          <span className="md:text-4xl text-lg">
            Add <span className="text-orange-500">Traveller</span> Information
          </span>
        }
        description=" The information you fill below is needed to quote and book your trip."
        restContent={
          <div className="w-[65vw] max-w-screen-xl ">
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
          </div>
        }
      />
      <BannerSlider />
      <PartnersSection />
      {iteneray && <Testimonial page="itinerary" itineraryId={iteneray.id} />}
      
    </div>
  )
}

export default ItineraryPage
