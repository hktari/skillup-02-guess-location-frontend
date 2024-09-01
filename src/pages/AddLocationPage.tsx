import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MapComponent, { Coordinates } from '../components/Common/MapComponent'
import SearchStreetComponent from '../components/Common/SearchStreetComponent'
import { useLocationsContext } from '../components/context/LocationProvider'
import { OsmAddress } from '../services/osm.interface'
import Container from '../components/Common/Container'
import LocationImageCard from '../components/LocationImageCard'
import PickImageCard from '../components/AddLocation/PickImageCard'

type AddLocationPageProps = {}

const AddLocationPage = (props: AddLocationPageProps) => {
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [selectedImageUrl, setSelectedImageUrl] = useState('')
  const [mapCoords, setMapCoords] = useState<Coordinates | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<OsmAddress | null>(
    null,
  )
  const [submitLocationEnabled, setSubmitLocationEnabled] = useState(false)

  const { addLocation } = useLocationsContext()
  const navigate = useNavigate()

  useEffect(() => {
    setSubmitLocationEnabled(selectedAddress !== null && imageBase64 !== null)
  }, [selectedAddress, imageBase64])

  useEffect(() => {
    if (!selectedAddress) {
      return
    }

    console.log('setting mapCoords', selectedAddress)

    setMapCoords({
      lat: selectedAddress.properties.lat,
      lng: selectedAddress.properties.lon,
    })
  }, [selectedAddress])

  async function onAddNew() {
    try {
      if (!selectedAddress || !imageBase64) {
        console.error(
          "can't add new. selected address is null or imageBase64 is null",
        )
        return
      }

      const newLocation = await addLocation(
        selectedAddress.properties.formatted,
        selectedAddress.properties.lat,
        selectedAddress.properties.lon,
        imageBase64,
      )
      navigate('/dashboard')
    } catch (error) {
      console.error('failed to add new location', error)
    }
  }

  function onAddressPicked(address: OsmAddress) {
    setSelectedAddress(address)
  }

  const pickImageCardProps = {
    setImageBase64,
    setSelectedImageUrl,
    imageBase64,
    selectedImageUrl,
  }

  return (
    <Container>
      <div className="space-y-4">
        <h2 className="text-3xl">
          Add a new <span className="text-patina-400">location</span>
        </h2>
        <PickImageCard {...pickImageCardProps} />

        <MapComponent coords={mapCoords} />
        <div>
          <SearchStreetComponent onAddressPicked={onAddressPicked} />
        </div>
        <button disabled={!submitLocationEnabled} onClick={onAddNew}>
          ADD NEW
        </button>
      </div>
    </Container>
  )
}

export default AddLocationPage
