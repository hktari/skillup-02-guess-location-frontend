import React, { useEffect, useRef, useState } from 'react'
import '../css/pages/AddLocationPage.css'

type AddLocationPageProps = {}

const AddLocationPage = (props: AddLocationPageProps) => {
    const [image, setImage] = useState<any>(null)

    useEffect(() => {
        setImage("https://images.unsplash.com/photo-1543872084-c7bd3822856f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
    }, [])

    const selectedImageRef = useRef<HTMLInputElement | null>(null);

    function onImagePicked(event: any) {
        if (event.target.files.length > 0) {
            setImage(event.target.files[0]);

            const selectedImgEl: HTMLImageElement = document.getElementById('selectedImage') as HTMLImageElement

            selectedImgEl.src = URL.createObjectURL(event.target.files[0]);
            selectedImgEl.onload = () => {
                URL.revokeObjectURL(selectedImgEl.src);
            }
        }
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
                    <button className="btn btn-cancel"><span className="material-icons">close</span></button>
                </div>
                <div className="map-container">

                </div>
                <div className="location-address">
                    <label htmlFor='address' className="body">Location</label>
                    <input id='address' className='input input-border' type="text" placeholder='Enter Address' />
                </div>

                <button className="btn btn-positive btn-block add-new">ADD NEW</button>
            </section>
        </div>
    )
}

export default AddLocationPage