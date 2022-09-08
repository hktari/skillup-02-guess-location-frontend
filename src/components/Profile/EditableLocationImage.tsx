import React, { EventHandler } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LocationImage } from '../../services/interface'

type EditableLocationImageProps = {
    locationImage: LocationImage
}

const EditableLocationImage = ({ locationImage }: EditableLocationImageProps) => {

    const navigate = useNavigate()

    function onClick(ev: React.MouseEvent<HTMLAnchorElement>) {
        ev.preventDefault()
        
        navigate('/location/edit', {
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

export default EditableLocationImage