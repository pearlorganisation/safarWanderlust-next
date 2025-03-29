import React, { useRef, useState, useEffect } from 'react'
import Card from '../../components/HomeCategoryCard' // Import the Card component
import { useDispatch, useSelector } from 'react-redux'
import CategoryPageCard from '../../components/CategoryPageCard'
import { fetchHomeCategories } from '../../../../redux/thunks/fetchHomeCategories'

const CategorySection = () => {
  const categories = useSelector((state) => state.global.homeCategories) || []
  const dispatch = useDispatch()
  const scrollContainerRef = useRef(null)
  const [blurLevels, setBlurLevels] = useState([])
  const [imageLoaded, setImageLoaded] = useState(
    Array(categories.length).fill(false)
  )

  useEffect(() => {

    const container = scrollContainerRef.current
    const children = Array.from(container.children[0].children)

    const observer = new IntersectionObserver(
      (entries) => {
        const newBlurLevels = entries.map((entry) => {
          const visibleRatio = entry.intersectionRatio
          const blurIntensity = Math.max(0, 1 - visibleRatio)
          return blurIntensity
        })

        setBlurLevels((prev) => {
          const updatedLevels = [...prev]
          entries.forEach((entry, idx) => {
            const index = children.indexOf(entry.target)
            updatedLevels[index] = newBlurLevels[idx]
          })
          return updatedLevels
        })
      },
      {
        root: container,
        threshold: Array.from({ length: 11 }, (_, i) => i / 10)
      }
    )

    children.forEach((child) => observer.observe(child))

    return () => observer.disconnect()
  }, [categories, dispatch])

  const handleImageLoaded = (index) => {
    setImageLoaded((prev) => {
      const updatedLoaded = [...prev]
      updatedLoaded[index] = true
      return updatedLoaded
    })
  }

  return (
    <section className="my-10 md:mx-14  md:my-20">
      <div className="mx-auto text-center">
        <h2 className="mb-3 font-titleMedium text-2xl md:text-5xl">
        Discover Group Travel by{' '}
          <span className="text-orange-500">Category</span>
        </h2>
        <div className="mx-auto  mb-20 font-titleRegular text-sm text-gray-500 md:text-base">
          <p>
          Discover curated categories with Safar Wanderlust for adventures that inspire and connect.
          </p>
        </div>

        <div
          className=" no-scrollbar hidden overflow-x-auto md:block"
          ref={scrollContainerRef}
        >
          <div className="flex space-x-6 px-4 ">
            {categories.map((category, index) => (
              <Card
                key={index}
                route_map={category.route_map}
                title={category.name}
                description={category.short_description}
                image={category.image}
                blurLevel={blurLevels[index]}
                imageLoaded={imageLoaded[index]}
                handleImageLoaded={handleImageLoaded}
                index={index}
                id={category.id}
              />
            ))}
            <div className="min-w-10"></div>
          </div>
        </div>
        <div className=" flex  gap-4  overflow-x-scroll md:hidden  ">
          {categories.map((category, index) => (
            <CategoryPageCard
              key={category.id}
              route_map={category.route_map}
              id={category.id}
              title={category.name}
              description={category.short_description}
              image={category.image}
              blurLevel={0}
              imageLoaded={imageLoaded}
              handleImageLoaded={handleImageLoaded}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
