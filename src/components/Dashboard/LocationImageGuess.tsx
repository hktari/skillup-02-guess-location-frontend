import React from 'react'
import { Link as button, useNavigate } from 'react-router-dom'
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
        <button onClick={navigateToGuessLocation} className='link'>
            <div className='location-img-container location-img-guess'>
                <img src={locationImage.imageUrl} alt={locationImage.address} />
                <div className="img-overlay"></div>
                <div className="img-overlay-text">{locationImage.guessErrorMeters} m</div>
            </div>
        </button>
    )
}

export default LocationImageGuess