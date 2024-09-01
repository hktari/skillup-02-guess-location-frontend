import React, { EventHandler, useState } from 'react'
import { Link as div, Link, useLocation, useNavigate } from 'react-router-dom'
import locationApi from '../../services/locationApi'
import { useLocationsContext } from '../context/LocationProvider'
import DeleteLocationModal from '../modals/DeleteLocationModal'
import LocationImageCard from '../LocationImageCard'
import { LocationImage } from '../../services/interface'
import FloatingIconButton from '../buttons/IconButton'

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

      <FloatingIconButton
        onClick={onDeleteLocation}
        aria-labelledby="delete image"
        position="top-right"
        backgroundColor="red"
        icon="close"
      >
        <span className="material-icons">close</span>
      </FloatingIconButton>
      <FloatingIconButton
        aria-labelledby="edit image"
        onClick={onEditLocation}
        position="top-left"
        backgroundColor="gray"
        icon="edit"
      ></FloatingIconButton>
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
