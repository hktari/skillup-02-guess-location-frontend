import React, { EventHandler, useState } from 'react'
import { Link as div, Link, useLocation, useNavigate } from 'react-router-dom'
import locationApi from '../../services/locationApi'
import { useLocationsContext } from '../context/LocationProvider'
import DeleteLocationModal from '../modals/DeleteLocationModal'
import LocationImageCard from '../LocationImageCard'
import { LocationImage } from '../../services/interface'

type EditableLocationImageProps = {
  locationImage: LocationImage
}

const EditableLocationImage = ({
  locationImage,
}: EditableLocationImageProps) => {
  const [deleteImageModalOpen, setDeleteImageModalOpen] =
    useState<boolean>(false)
  const { deleteLocation } = useLocationsContext()
  const navigate = useNavigate()

  function onDeleteLocation(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    setDeleteImageModalOpen(true)
  }

  function onEditLocation(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    navigate('/location/edit', {
      state: locationImage,
    })
  }

  function toggleHoverOnParent(
    ev: React.MouseEvent<HTMLButtonElement>,
    noHover: boolean,
  ) {
    ev.currentTarget.parentElement?.classList.toggle('no-hover', noHover)
  }

  async function deleteImage() {
    try {
      await deleteLocation(locationImage.id)
    } catch (error) {
      console.error(error)
      window.alert('Failed to delete image')
    }
  }

  return (
    <Link
      state={locationImage}
      to={'/location/edit'}
      aria-labelledby="image details"
      className=""
    >
      <LocationImageCard {...locationImage} />

      <button
        onMouseOver={(ev) => toggleHoverOnParent(ev, true)}
        onMouseLeave={(ev) => toggleHoverOnParent(ev, false)}
        onClick={onDeleteLocation}
        aria-labelledby="delete image"
        className=""
      >
        <span className="material-icons">close</span>
      </button>
      <button
        onMouseOver={(ev) => toggleHoverOnParent(ev, true)}
        onMouseLeave={(ev) => toggleHoverOnParent(ev, false)}
        aria-labelledby="edit image"
        onClick={onEditLocation}
        className=""
      >
        <span className="material-icons">edit</span>
      </button>
      <DeleteLocationModal
        isOpen={deleteImageModalOpen}
        onChoicePicked={(areYouSure) => {
          if (areYouSure) {
            deleteImage()
          }
          setDeleteImageModalOpen(false)
        }}
        handleClose={() => setDeleteImageModalOpen(false)}
      />
    </Link>
  )
}

export default EditableLocationImage
