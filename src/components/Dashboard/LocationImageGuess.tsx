import React from 'react'
import '../../css/components/Dashboard/LocationImageGuess.css'
import { LocationImage } from '../../services/interface'

type LocationImageGuessProps = {
    locationImage: LocationImage
}

const LocationImageGuess = ({ locationImage }: LocationImageGuessProps) => {
    return (
        <div className='location-img-container location-img-guess'>
            <img src={locationImage.image} alt={locationImage.address} />
            <div className="img-overlay"></div>
            <div className="img-overlay-text">{locationImage.guessErrorMeters} m</div>
        </div>
    )
}

export default LocationImageGuess