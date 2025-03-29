import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HeroSectionCard from '../../components/HeroSectionCard'

const Carousel = ({ setActiveIndexM }) => {
  const carouselRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [isJumping, setIsJumping] = useState(false) // Flag to manage smooth scrolling

  // Fetch hero itineraries from the Redux store
  const HeroItineraries =
    useSelector((state) => state.global.HeroItineraries) || []

  // Duplicate the itineraries array
  const duplicatedItineraries = [...HeroItineraries, ...HeroItineraries]

  const totalImages = duplicatedItineraries.length

  const handleScroll = () => {
    if (isJumping) return

    const carousel = carouselRef.current
    const cardWidth = carousel.scrollWidth / totalImages
    const scrollLeft = carousel.scrollLeft

    const threshold = cardWidth * (totalImages / 2)

    if (scrollLeft > cardWidth * (totalImages / 2)) {
      setIsJumping(true)
      carousel.style.scrollBehavior = 'auto'
      carousel.scrollLeft = 1

      setTimeout(() => {
        carousel.style.scrollBehavior = 'smooth'
        setIsJumping(false)
      }, 20)
    } else if (scrollLeft <= 0) {
      setIsJumping(true)
      carousel.style.scrollBehavior = 'auto'
      carousel.scrollLeft = threshold - 10

      setTimeout(() => {
        carousel.style.scrollBehavior = 'smooth'
        setIsJumping(false)
      }, 20)
    }

    const index = Math.round(scrollLeft / cardWidth + 0.6)
    setActiveIndex(index)
    setActiveIndexM(index % (totalImages / 2))
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.scrollLeft = carousel.scrollWidth / (totalImages + 2)
      carousel.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (carousel) carousel.removeEventListener('scroll', handleScroll)
    }
  }, [totalImages])

  return (
    <div
      ref={carouselRef}
      className="carousel flex overflow-x-scroll overflow-y-hidden scrollbar-hide p-3.5 rounded-lg flex-shrink-0"
    >
      {duplicatedItineraries.map((itinerary, index) => (
        <HeroSectionCard
          key={`${index}`} // Unique key for each item
          imageUrl={itinerary.image[0]} // Assuming 'view_images' is an array, using the first image
          title={itinerary.title}
          description={itinerary.short_description || itinerary.description}
          buttonText="Learn More"
          onButtonClick={() => alert(`Card ${index + 1} clicked!`)}
          isActive={activeIndex === index}
          extraClasses="m-2"
        />
      ))}
    </div>
  )
}

export default Carousel
