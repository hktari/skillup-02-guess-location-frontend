import React, { EventHandler } from 'react'
import { Link as div, useNavigate } from 'react-router-dom'
import { LocationImage } from '../../services/interface'

type EditableLocationImageProps = {
    locationImage: LocationImage
}

const EditableLocationImage = ({ locationImage }: EditableLocationImageProps) => {

    const navigate = useNavigate()

    function onClick(ev: React.MouseEvent<HTMLDivElement>) {
        ev.preventDefault()
        navigate('/location/guess', {
            state: locationImage
        })
    }

    function onDeleteLocation(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
    }

    function onEditLocation(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        navigate('/location/edit', {
            state: locationImage
        })
    }

    function toggleHoverOnParent(ev: React.MouseEvent<HTMLButtonElement>, noHover: boolean) {
        ev.currentTarget.parentElement?.classList.toggle('no-hover', noHover)
    }

    return (
        <div onClick={onClick} className='location-img-container editable'>
            <img src={locationImage.image} alt={locationImage.address} />
            <button
                onMouseOver={ev => toggleHoverOnParent(ev, true)}
                onMouseLeave={ev => toggleHoverOnParent(ev, false)}
                onClick={onDeleteLocation} className="btn btn-cancel">
                <span className="material-icons">close</span>
            </button>
            <button
                onMouseOver={ev => toggleHoverOnParent(ev, true)}
                onMouseLeave={ev => toggleHoverOnParent(ev, false)}
                onClick={onEditLocation} className="btn btn-edit">
                <span className="material-icons">edit</span>
            </button>
        </div>
    )
}

export default EditableLocationImage