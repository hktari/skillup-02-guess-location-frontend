import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MapComponent from '../components/Common/MapComponent'
import SearchStreetComponent from '../components/Common/SearchStreetComponent'
import LocationImageComponent from '../components/Dashboard/LocationImageComponent'
import LeaderboardComponent from '../components/GuessLocation/LeaderboardComponent'
import '../css/pages/GuessLocationPage.css'
import { LocationImage } from '../services/interface'
import locationApi from '../services/locationApi'


const GuessLocationPage = () => {
    const [searchTerm, setSearchTerm] = useState('second')
    const [selectedAddress, setSelectedAddress] = useState('')
    const [errorDistance, setErrorDistance] = useState('')
    const [inputEnabled, setInputEnabled] = useState(false)

    const location = useLocation()
    const locationImage = location.state as LocationImage

    if (!locationImage) {
        console.error('no location image passed to GuessLocationPage')
    }

    useEffect(() => {
        if (locationImage.guessErrorMeters === null || locationImage.guessErrorMeters === undefined) {
            setInputEnabled(true)
        }

        setSearchTerm(locationImage.address)
    }, [locationImage])


    function onAddressPicked(address: any) {
        setSelectedAddress(address)
        console.log('address picked', address)
    }

    function onGuessClicked() {
        console.log('guess clicked')
    }

    return (
        <div className='container'>
            <section className="section guess-location">
                <h2 className="header4">Take a <span className="text-positive">guess</span> !</h2>
                <LocationImageComponent locationImage={locationImage} />
                <MapComponent searchTerm={searchTerm} />
                <SearchStreetComponent onAddressPicked={onAddressPicked} />
                <div className="error-distance w3-margin-top">
                    <label className='body' htmlFor="errorDistance">Error distance</label>
                    <div className='input input-border' id="errorDistance" >{errorDistance}</div>
                </div>
                <button disabled={!inputEnabled} onClick={onGuessClicked} className="btn btn-positive w3-right">GUESS</button>
            </section>
            <section className="section leaderboards">
                <h2 className="header4">Leaderboard</h2>
                <LeaderboardComponent locationImageId={locationImage.id} />
            </section>
        </div>
    )
}

export default GuessLocationPage