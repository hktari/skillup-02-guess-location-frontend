import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LocationImage as LocationImageType } from '../../services/interface'
import LocationImage from '../LocationImageCard'

type LocationImageProps = {
  locationImage: LocationImageType
  interactable?: boolean
}

const LocationImageComponent = ({
  locationImage,
  interactable = true,
}: LocationImageProps) => {
  return interactable ? (
    <Link
      aria-label={`Link to guess image ${locationImage.id}`}
      to={'/location/guess'}
      state={locationImage}
      className={`rounded-md} group grid h-full w-full grid-cols-1 grid-rows-1 overflow-hidden`}
    >
      <LocationImage {...locationImage} />
    </Link>
  ) : (
    <LocationImage {...locationImage} overlay={false} />
  )
}

export default LocationImageComponent
