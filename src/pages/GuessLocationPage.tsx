import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MapComponent from '../components/Common/MapComponent'
import LocationImageComponent from '../components/Dashboard/LocationImageComponent'
import '../css/pages/GuessLocationPage.css'
import { LocationImage } from '../services/interface'


const GuessLocationPage = () => {
    const [searchTerm, setSearchTerm] = useState('second')

    const location = useLocation()
    const locationImage = location.state as LocationImage

    if (!locationImage) {
        console.error('no location image passed to GuessLocationPage')
    }

    useEffect(() => {
        setSearchTerm(locationImage.address)
    }, [locationImage])

    return (
        <div className='container'>
            <section className="section guess-location">
                <h2 className="header4">Take a <span className="text-positive">guess</span> !</h2>
                <LocationImageComponent locationImage={locationImage} />
                <MapComponent searchTerm={searchTerm} />
                
            </section>
        </div>
    )
}

export default GuessLocationPage