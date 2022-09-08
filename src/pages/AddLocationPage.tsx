import React, { useEffect, useState } from 'react'
import '../css/pages/AddLocationPage.css'

type AddLocationPageProps = {}

const AddLocationPage = (props: AddLocationPageProps) => {
    const [image, setImage] = useState<any>(null)

    useEffect(() => {
        setImage("https://images.unsplash.com/photo-1543872084-c7bd3822856f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
    }, [])


    return (
        <div className='container add-location-page'>
            <section className="section" id="add-location">
                <h2 className='header4 text-center'>Add a new <span className="text-positive">location</span></h2>
                <div className="pick-image">
                    <div hidden={image !== null}>
                        <span className="material-icons">image</span>
                    </div>
                    <img src={image} alt="" hidden={image === null} />
                </div>
                <div className="btn-container">
                    <button className="btn btn-positive">UPLOAD IMAGE</button>
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