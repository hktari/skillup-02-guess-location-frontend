import React from 'react'
import { LocationImage } from '../services/interface'
import SampleLocationImage from '../assets/images/location-img-sample01.png'

type Props = {
  overlay?: boolean
  imageUrl: string
  address?: string
}

const LocationImageCard = ({ overlay = true, imageUrl, address = 'geotagger image' }: Props) => {
  return (
    <div
      className={`group grid h-full w-full grid-cols-1 grid-rows-1 overflow-hidden rounded-md`}
    >
      <div className="col-start-1 col-end-2 row-start-1 row-end-2">
        {/* TODO: remove after cloudinary intergration */}
        <img
          className={`h-full w-full object-cover`}
          src={SampleLocationImage}
          alt={address}
        />
        {/* <img src={locationImage.imageUrl} alt={locationImage.address} /> */}
      </div>
      <div
        className={`w-100 h-100 col-start-1 col-end-2 row-start-1 row-end-2 transition-opacity ${overlay ? 'bg-patina-300 opacity-75 group-hover:opacity-50' : ''}`}
      ></div>
    </div>
  )
}

export default LocationImageCard
