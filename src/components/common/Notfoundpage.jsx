import React from 'react'
import NotFoundImage from '../../assets/svgs/404.svg'
import AdminBackground from '../../assets/svgs/AdminBackground.svg'

import { useNavigate } from 'react-router-dom'
import { PAGES } from '../../constants/PagesName'

function NotFound() {
  const navigate = useNavigate()
  const handleBackToDashboardClick = () => {
    navigate(PAGES.DASHBOARD, { replace: true })
  }
  return (
    <div
      className=" h-screen w-full bg-cover bg-center flex items-center justify-center"
      // style={{ backgroundImage: `url(${AdminBackground})` }}
    >
      <img src={AdminBackground} alt="bg image" className="h-screen w-screen absolute object-cover z-[-1] " />
      <div className=" bg-white p-14 rounded-lg shadow-md overflow-auto flex flex-col justify-between items-center">
        <div className="py-4">
          <div className="mb-10">
            <img src={NotFoundImage} alt="not_found_img" />
          </div>
          <div className="w-full">
            <h1 className="font-nunitobold700 text-center text-2xl mb-5 ">
              Looks like you've got lost....
            </h1>
            <button
              onClick={handleBackToDashboardClick}
              className={`font-nunitobold700 w-full p-2 bg-buttonBackground rounded-lg text-buttonText`}
            >
              Back To Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
