import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LocationImage } from '../../services/interface'
import SampleLocationImage from '../../assets/images/location-img-sample01.png'

type LocationImageGuessProps = {
  locationImage: LocationImage
}

const LocationImageGuess = ({ locationImage }: LocationImageGuessProps) => {
  return (
    <Link
      state={locationImage}
      to={'/location/guess'}
      className="group relative block overflow-hidden rounded-lg"
    >
      {/* TODO: remove hardcoded image after cloudinary implementation */}
      <img
        className="w-72 h-48 max-w-md"
        src={SampleLocationImage}
        alt={locationImage.address}
      />
      <div className="absolute inset-0 z-10 bg-patina-400 opacity-75 group-hover:opacity-90"></div>
      <div className="absolute inset-0 z-20 flex items-center justify-center text-3xl font-medium text-white transition-transform group-hover:scale-105">
        {locationImage.guessResult?.errorInMeters} m
      </div>
    </Link>
  )
}

export default LocationImageGuess
