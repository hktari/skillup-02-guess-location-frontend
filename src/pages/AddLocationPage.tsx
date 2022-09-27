import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MapComponent, { Coordinates } from '../components/Common/MapComponent'
import SearchStreetComponent from '../components/Common/SearchStreetComponent'
import { useLocationsContext } from '../components/context/LocationProvider'
import '../css/pages/AddLocationPage.css'
import locationApi from '../services/locationApi'
import { OsmAddress } from '../services/osm.interface'
import { fileToBase64 } from '../util/fileUtil'

type AddLocationPageProps = {}

const AddLocationPage = (props: AddLocationPageProps) => {
    const [imageBase64, setImageBase64] = useState<string | null>(null)

    const [mapCoords, setMapCoords] = useState<Coordinates | null>(null)
    const selectedImageRef = useRef<HTMLInputElement | null>(null)
    const [selectedAddress, setSelectedAddress] = useState<OsmAddress | null>(null)
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

        setMapCoords({ lat: selectedAddress.properties.lat, lng: selectedAddress.properties.lon })
    }, [selectedAddress])

    async function onImagePicked(event: any) {
        if (event.target.files.length > 0) {
            try {
                const selectedImgEl: HTMLImageElement = document.getElementById('selectedImage') as HTMLImageElement

                selectedImgEl.src = URL.createObjectURL(event.target.files[0])
                selectedImgEl.onload = () => {
                    URL.revokeObjectURL(selectedImgEl.src)
                }

                setImageBase64(await fileToBase64(event.target.files[0]))
            } catch (error) {
                console.error('failed to process image', error)
            }
        }
    }

    function clearImage() {
        const selectedImgEl: HTMLImageElement = document.getElementById('selectedImage') as HTMLImageElement
        selectedImgEl.src = ''
    }

    async function onAddNew() {
        try {
            if (!selectedAddress || !imageBase64) {
                console.error("can't add new. selected address is null or imageBase64 is null")
                return;
            }

            const newLocation = await addLocation(selectedAddress.properties.formatted, selectedAddress.properties.lat,
                selectedAddress.properties.lon,
                imageBase64)
            navigate('/dashboard')
        } catch (error) {
            console.error('failed to add new location', error)
        }
    }

    function onAddressPicked(address: OsmAddress) {
        setSelectedAddress(address)
    }

    return (
        <div className='container add-location-page'>
            <section className="section" id="add-location">
                <h2 className='header4 text-center'>Add a new <span className="text-positive">location</span></h2>
                <div className="pick-image">
                    <div hidden={imageBase64 !== null}>
                        <span className="material-icons">image</span>
                    </div>

                    <img id='selectedImage' alt="" hidden={imageBase64 === null} />
                </div>
                <div className="btn-container">
                    <button className="btn btn-positive" onClick={() => selectedImageRef.current?.click()}>
                        UPLOAD IMAGE
                        <input accept="image/png, image/jpeg" type='file' id='image'
                            ref={selectedImageRef} style={{ display: 'none' }}
                            onChange={onImagePicked} />
                    </button>
                    <button onClick={clearImage} className="btn btn-cancel"><span className="material-icons">close</span></button>
                </div>
                <MapComponent coords={mapCoords} />
                <SearchStreetComponent onAddressPicked={onAddressPicked} />
                <button className="btn btn-positive btn-block add-new" onClick={onAddNew}>ADD NEW</button>
            </section>
        </div>
    )
}

export default AddLocationPage