import React from 'react'
import '../../css/components/Dashboard/LocationImageGuess.css'

type LocationImageGuessProps = {
    img: any,
    title: string,
    text: string
}

const LocationImageGuess = ({ img, title, text }: LocationImageGuessProps) => {
    return (
        <div className='location-img-container location-img-guess'>
            <img src={img} alt={title} />
            <div className="img-overlay"></div>
            <div className="img-overlay-text">{text}</div>
        </div>
    )
}

export default LocationImageGuess