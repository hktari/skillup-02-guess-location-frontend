import React, { EventHandler, useState } from 'react'
import { Link as div, useNavigate } from 'react-router-dom'
import { LocationImage } from '../../services/interface'
import DeleteLocationModal from '../modals/DeleteLocationModal'

type EditableLocationImageProps = {
    locationImage: LocationImage
}

const EditableLocationImage = ({ locationImage }: EditableLocationImageProps) => {

    const [deleteImageModalOpen, setDeleteImageModalOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    function onClick(ev: React.MouseEvent<HTMLDivElement>) {
        ev.preventDefault()
        navigate('/location/guess', {
            state: locationImage
        })
    }

    function onDeleteLocation(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        setDeleteImageModalOpen(true);
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

    function deleteImage() {
        console.log('deleting image')
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
            <DeleteLocationModal locationImage={locationImage}
                isOpen={deleteImageModalOpen}
                onChoicePicked={(areYouSure, _) => {
                    if (areYouSure) {
                        deleteImage()
                    }
                }}
                handleClose={() => setDeleteImageModalOpen(false)} />
        </div>
    )
}

export default EditableLocationImage