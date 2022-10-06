import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../css/components/Dashboard/LocationImageGuess.css'
import { LocationImage } from '../../services/interface'

type LocationImageGuessProps = {
    locationImage: LocationImage
}

const LocationImageGuess = ({ locationImage }: LocationImageGuessProps) => {
    const navigate = useNavigate()

    function navigateToGuessLocation() {
        navigate('/location/guess', {
            state: locationImage
        })
    }

    return (
        <a onClick={navigateToGuessLocation} className='link'>
            <div className='location-img-container location-img-guess'>
                <img src={locationImage.imageUrl} alt={locationImage.address} />
                <div className="img-overlay"></div>
                <div className="img-overlay-text">{locationImage.guessResult?.errorInMeters} m</div>
            </div>
        </a>
    )
}

export default LocationImageGuess