import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LocationImage } from '../../services/interface'

type LocationImageProps = {
    locationImage: LocationImage,

}

const LocationImageComponent = ({ locationImage }: LocationImageProps) => {
    const navigate = useNavigate()

    function onClick(ev: React.MouseEvent<HTMLAnchorElement>) {
        ev.preventDefault()

        navigate('/location/guess', {
            state: locationImage
        })
    }
    return (
        <div className='location-img-container'>
            <Link onClick={onClick} to={`/location/guess/${locationImage.id}`}>
                <img src={locationImage.image} alt={locationImage.address} />
            </Link>
        </div>
    )
}

export default LocationImageComponent