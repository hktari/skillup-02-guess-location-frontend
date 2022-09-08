import React from 'react'
import { Link } from 'react-router-dom'
import { LocationImage } from '../../services/interface'

type LocationImageProps = {
    locationImage: LocationImage,

}

const LocationImageComponent = ({ locationImage }: LocationImageProps) => {
    return (
        <div className='location-img-container'>
            <Link to={`/location/guess/${locationImage.id}`}>
                <img src={locationImage.image} alt={locationImage.address} />
            </Link>
        </div>
    )
}

export default LocationImageComponent