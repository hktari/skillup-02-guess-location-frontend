import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LocationImage } from '../../services/interface'

import SampleLocationImage from '../../assets/images/location-img-sample01.png'
type LocationImageProps = {
  locationImage: LocationImage
  interactable?: boolean
}

const LocationImageComponent = ({
  locationImage,
  interactable = true,
}: LocationImageProps) => {
  const navigate = useNavigate()

  function onClick(ev: React.MouseEvent<HTMLAnchorElement>) {
    ev.preventDefault()

    navigate('/location/guess', {
      state: locationImage,
    })
  }
  return (
    <button
      className={`group grid grid-cols-1 grid-rows-1 overflow-hidden rounded-md ${!interactable ? '' : ''}`}
    >
      <Link
        className="col-start-1 col-end-2 row-start-1 row-end-2"
        onClick={onClick}
        to={`/location/guess/${locationImage.id}`}
      >
        {/* TODO: remove after cloudinary intergration */}
        <img
          className="h-48 w-72 max-w-md"
          src={SampleLocationImage}
          alt={locationImage.address}
        />
        {/* <img src={locationImage.imageUrl} alt={locationImage.address} /> */}
      </Link>
      <div className="w-100 h-100 col-start-1 col-end-2 row-start-1 row-end-2 bg-patina-300 opacity-75 group-hover:opacity-50"></div>
    </button>
  )
}

export default LocationImageComponent
