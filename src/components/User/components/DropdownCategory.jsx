import { useNavigate } from "react-router-dom"

const DropdownCategory = ({ title, emoji, items, setState }) => {
  const navigate = useNavigate()
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">
        {title}
        <img
          className="h-5 w-5 object-center inline-block"
          src={emoji}
          alt=""
        />
      </h3>
      <div className="space-x-3 flex items-center justify-start px-4 flex-shrink-0">
        {items.map((item, index) => (
          <div
            onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  isDropdownOpen: false
                }))
              navigate(`/itinerary/${item.route_map}`)}}
            style={{
              backgroundImage: `url(${item.view_images[0]})`
            }}
            key={index}
            className="rounded-lg  overflow-hidden flex flex-col justify-end text-white flex-shrink-0 w-[30%] h-32 bg-no-repeat bg-cover bg-center hover:bg-gray-200 transition duration-300"
          >
            <h4 className="text-sm font-semibold text-center bg-black/30 py-2 px-1 ">
              {item.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropdownCategory