import React, { useEffect, useRef, useState } from 'react'
import MapComponent from '../components/Common/MapComponent'
import '../css/pages/AddLocationPage.css'

type AddLocationPageProps = {}

const AddLocationPage = (props: AddLocationPageProps) => {
    const [image, setImage] = useState<any>(null)
    const [searchTerm, setSearchTerm] = useState('Klopeinersee, Austria')
    const selectedImageRef = useRef<HTMLInputElement | null>(null)

    function onImagePicked(event: any) {
        if (event.target.files.length > 0) {
            setImage(event.target.files[0])

            const selectedImgEl: HTMLImageElement = document.getElementById('selectedImage') as HTMLImageElement

            selectedImgEl.src = URL.createObjectURL(event.target.files[0])
            selectedImgEl.onload = () => {
                URL.revokeObjectURL(selectedImgEl.src)
            }
        }
    }

    function clearImage() {
        const selectedImgEl: HTMLImageElement = document.getElementById('selectedImage') as HTMLImageElement
        selectedImgEl.src = ''
    }

    return (
        <div className='container add-location-page'>
            <section className="section" id="add-location">
                <h2 className='header4 text-center'>Add a new <span className="text-positive">location</span></h2>
                <div className="pick-image">
                    <div hidden={image !== null}>
                        <span className="material-icons">image</span>
                    </div>

                    <img id='selectedImage' alt="" hidden={image === null} />
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
                <MapComponent searchTerm={searchTerm} />
                <button className="btn btn-positive btn-block add-new">ADD NEW</button>
            </section>
        </div>
    )
}

export default AddLocationPage