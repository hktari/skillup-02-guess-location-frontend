import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MapComponent, { Coordinates } from '../components/Common/MapComponent'
import SearchStreetComponent from '../components/Common/SearchStreetComponent'
import LocationImageComponent from '../components/Dashboard/LocationImageComponent'
import LeaderboardComponent from '../components/GuessLocation/LeaderboardComponent'
import '../css/pages/GuessLocationPage.css'
import { GuessResult, LeaderboardItem, LocationImage } from '../services/interface'
import locationApi from '../services/locationApi'
import { OsmAddress } from '../services/osm.interface'
import osmApi from '../services/osmApi'


const GuessLocationPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedAddress, setSelectedAddress] = useState<OsmAddress | null>(null)
    const [errorDistance, setErrorDistance] = useState<number | null>(null)
    const [inputEnabled, setInputEnabled] = useState(false)
    const [leaderboardItems, setLeaderboardItems] = useState<LeaderboardItem[]>([])
    const [mapCoords, setMapCoords] = useState<Coordinates | null>(null)

    const location = useLocation()
    const locationImage = location.state as LocationImage

    if (!locationImage) {
        console.error('no location image passed to GuessLocationPage')
    }

    useEffect(() => {
        console.log('refreshing...')
        if (locationImage.guessResult) {
            populateWithGuessResult(locationImage.guessResult)
        }

        updateLeaderboard()
    }, [locationImage, locationImage.guessResult])


    async function updateLeaderboard() {
        console.log('leaderboards...')
        const leaderboardList = await locationApi.getLeaderboard(locationImage.id)
        setLeaderboardItems(leaderboardList.items)
    }

    function onAddressPicked(address: any) {
        setSelectedAddress(address)
        console.log('address picked', address)
    }

    function populateWithGuessResult(guessResult: GuessResult) {
        console.log('guess results...')
        setInputEnabled(true)
        setSearchTerm(guessResult.address)
        setErrorDistance(guessResult.errorInMeters)
    }

    async function onGuessClicked() {
        try {
            console.log('guess clicked')
            if (selectedAddress) {
                console.log('guessing...')
                const guessResult = await locationApi.guessLocation(locationImage.id, selectedAddress.properties.formatted,
                    selectedAddress.properties.lat, selectedAddress.properties.lon)
                console.log(guessResult)

                locationImage.guessResult = guessResult
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='container'>
            <div className="w3-row">
                <div className="w3-col s12 m8">
                    <section className="section guess-location">
                        <h2 className="header4">Take a <span className="text-positive">guess</span> !</h2>
                        <div className="w3-margin-top">
                            <LocationImageComponent interactable={false} locationImage={locationImage} />
                        </div>
                        <MapComponent coords={mapCoords} />
                        <div className="input-container">
                            <div className="search-street">
                                <SearchStreetComponent onAddressPicked={onAddressPicked} />
                            </div>
                            <div className="error-distance w3-margin-top">
                                <label className='body' htmlFor="errorDistance">Error distance</label>
                                <div className='input input-border' id="errorDistance" >{errorDistance ?? ''} m</div>
                            </div>
                        </div>
                        <button disabled={!inputEnabled} onClick={onGuessClicked}
                            className="btn btn-positive w3-right w3-margin-top">GUESS</button>
                    </section>
                </div>
                <div className="w3-col s12 m4">
                    <section className="section leaderboards">
                        <h2 className="header4">Leaderboard</h2>
                        <div className="w3-margin-top">
                            <LeaderboardComponent leaderboardItems={leaderboardItems} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default GuessLocationPage