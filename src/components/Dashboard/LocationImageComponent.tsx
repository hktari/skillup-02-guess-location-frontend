import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LocationImage } from '../../services/interface'

import SampleLocationImage from '../../assets/images/location-img-sample01.png'
type LocationImageProps = {
  locationImage: LocationImage
  fullContainerWidth?: boolean
  interactable?: boolean
}

const LocationImageComponent = ({
  fullContainerWidth = false,
  locationImage,
  interactable = true,
}: LocationImageProps) => {
  const navigate = useNavigate()

  function onClick(ev: React.MouseEvent<HTMLButtonElement>) {
    navigate('/location/guess', {
      state: locationImage,
    })
  }
  return (
    <button
      aria-label={`Link to guess image ${locationImage.id}`}
      disabled={!interactable}
      onClick={onClick}
      className={`group grid grid-cols-1 grid-rows-1 overflow-hidden rounded-md`}
    >
      <div className="col-start-1 col-end-2 row-start-1 row-end-2">
        {/* TODO: remove after cloudinary intergration */}
        <img
          className={`h-48 w-72 ${fullContainerWidth ? 'w-full' : 'max-w-md'}`}
          src={SampleLocationImage}
          alt={locationImage.address}
        />
        {/* <img src={locationImage.imageUrl} alt={locationImage.address} /> */}
      </div>
      <div className="w-100 h-100 col-start-1 col-end-2 row-start-1 row-end-2 bg-patina-300 opacity-75 group-hover:opacity-50"></div>
    </button>
  )
}

export default LocationImageComponent
