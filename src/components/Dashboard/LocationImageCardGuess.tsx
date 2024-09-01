import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LocationImage } from '../../services/interface'
import SampleLocationImage from '../../assets/images/location-img-sample01.png'
import LocationImageCard from '../LocationImageCard'

type LocationImageGuessCardProps = {
  locationImage: LocationImage
}

const LocationImageGuessCard = ({
  locationImage,
}: LocationImageGuessCardProps) => {
  return (
    <Link
      state={locationImage}
      to={'/location/guess'}
      className="group relative inline-block"
    >
      <LocationImageCard {...locationImage} />
      <div className="absolute inset-0 z-20 flex items-center justify-center text-3xl font-medium text-white transition-transform group-hover:scale-105">
        {locationImage.guessResult?.errorInMeters} m
      </div>
    </Link>
  )
}

export default LocationImageGuessCard
