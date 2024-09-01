import React, { EventHandler, useState } from 'react'
import { Link as div, Link, useLocation, useNavigate } from 'react-router-dom'
import locationApi from '../../services/locationApi'
import { useLocationsContext } from '../context/LocationProvider'
import DeleteLocationModal from '../modals/DeleteLocationModal'
import LocationImageCard from '../LocationImageCard'
import { LocationImage } from '../../services/interface'

type EditableLocationImageCardProps = {
  locationImage: LocationImage
}

const EditableLocationImageCard = ({
  locationImage,
}: EditableLocationImageCardProps) => {
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
      aria-labelledby="edit location image"
      className="relative inline-block"
    >
      <LocationImageCard {...locationImage} />

      <button
        onClick={onDeleteLocation}
        aria-labelledby="delete image"
        className="absolute right-0 top-0 m-2 flex items-center justify-center rounded-md bg-red-200 p-1 transition-transform hover:scale-105 hover:ring-2 hover:ring-red-700"
      >
        <span className="material-icons">close</span>
      </button>
      <button
        aria-labelledby="edit image"
        onClick={onEditLocation}
        className="absolute left-0 top-0 m-2 flex items-center justify-center rounded-md bg-gray-100 p-1"
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

export default EditableLocationImageCard
