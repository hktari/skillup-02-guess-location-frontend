import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MapComponent from '../components/Common/MapComponent'
import SearchStreetComponent from '../components/Common/SearchStreetComponent'
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

    function onAddressPicked(address: any) {

        console.log('address picked', address)
    }

    return (
        <div className='container'>
            <section className="section guess-location">
                <h2 className="header4">Take a <span className="text-positive">guess</span> !</h2>
                <LocationImageComponent locationImage={locationImage} />
                <MapComponent searchTerm={searchTerm} />
                <SearchStreetComponent onAddressPicked={onAddressPicked} />
            </section>
        </div>
    )
}

export default GuessLocationPage