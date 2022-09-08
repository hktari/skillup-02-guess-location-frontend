import React, { useEffect, useRef, useState } from 'react'
import '../css/pages/AddLocationPage.css'

type AddLocationPageProps = {}

const AddLocationPage = (props: AddLocationPageProps) => {
    const [image, setImage] = useState<any>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [address, setAddress] = useState('')
    const [lastChangeTime, setLastChangeTime] = useState(Date.now())
    const [prevAddress, setPrevAddress] = useState('')
    
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

    function clearImage() {
        const selectedImgEl: HTMLImageElement = document.getElementById('selectedImage') as HTMLImageElement
        selectedImgEl.src = '';
    }

    useEffect(() => {
        const monitorAddress = setInterval(() => {
            console.log('ping')
            if (prevAddress !== address && Date.now() - lastChangeTime > 3000) {
                setPrevAddress(address)
                setSearchTerm(encodeURIComponent(address))
            }
        }, 1000)

        return () => {
            clearInterval(monitorAddress)
        }
    }, [lastChangeTime, prevAddress, address])

    function onAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('change')
        if(prevAddress !== event.target.value){
            setLastChangeTime(Date.now())
        }

        setPrevAddress(address)
        setAddress(event.target.value)
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
                <div className="map-container">
                    <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" src={`https://www.google.com/maps/embed/v1/search?q=${searchTerm}&key=AIzaSyDNRcu5VIhm_sgBSdZPHG6SAe9UClEFS4U`}></iframe>
                </div>
                <div className="location-address">
                    <label htmlFor='address' className="body">Location</label>
                    <input id='address' className='input input-border' type="text"
                        placeholder='Enter Address'
                        onChange={onAddressChange}
                        value={address} />
                </div>

                <button className="btn btn-positive btn-block add-new">ADD NEW</button>
            </section>
        </div>
    )
}

export default AddLocationPage