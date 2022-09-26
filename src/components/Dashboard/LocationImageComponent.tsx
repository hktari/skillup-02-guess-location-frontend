import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LocationImage } from '../../services/interface'

type LocationImageProps = {
    locationImage: LocationImage,
    interactable?: boolean
}

const LocationImageComponent = ({ locationImage, interactable = true }: LocationImageProps) => {
    const navigate = useNavigate()

    function onClick(ev: React.MouseEvent<HTMLAnchorElement>) {
        ev.preventDefault()

        navigate('/location/guess', {
            state: locationImage
        })
    }
    return (
        <div className={`location-img-container ${!interactable ? 'no-interact' : ''}`}>
            <Link
                onClick={onClick}
                to={`/location/guess/${locationImage.id}`}>
                <img src={locationImage.imageUrl} alt={locationImage.address} />
            </Link>
        </div>
    )
}

export default LocationImageComponent