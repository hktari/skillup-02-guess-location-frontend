import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MapComponent, { Coordinates } from '../components/Common/MapComponent'
import SearchStreetComponent from '../components/Common/SearchStreetComponent'
import LocationImageComponent from '../components/Dashboard/LocationImageComponent'
import LeaderboardComponent from '../components/GuessLocation/LeaderboardComponent'
import InfoModal from '../components/modals/InfoModal'
import '../css/pages/GuessLocationPage.css'
import { GuessResult, LeaderboardItem, LocationImage } from '../services/interface'
import locationApi from '../services/locationApi'
import { OsmAddress } from '../services/osm.interface'


const GuessLocationPage = () => {
    const [selectedAddress, setSelectedAddress] = useState<OsmAddress | null>(null)
    const [errorDistance, setErrorDistance] = useState<number | null>(null)
    const [inputEnabled, setInputEnabled] = useState(true)
    const [leaderboardItems, setLeaderboardItems] = useState<LeaderboardItem[]>([])
    const [mapCoords, setMapCoords] = useState<Coordinates | null>(null)
    const [guessResult, setGuessResult] = useState<GuessResult | null>(null)
    const [guessCoords, setGuessCoords] = useState<Coordinates>()
    const [targetCoords, setTargetCoords] = useState<Coordinates>()

    const location = useLocation()
    const locationImage = location.state as LocationImage

    if (!locationImage) {
        console.error('no location image passed to GuessLocationPage')
    }

    useEffect(() => {
        console.log('refreshing...')
        if (locationImage.guessResult) {
            setGuessResult(locationImage.guessResult)
        }

        updateLeaderboard()
    }, [locationImage])

    useEffect(() => {
        if (guessResult) {
            populateWithGuessResult(guessResult)
        }

        updateLeaderboard()
    }, [guessResult])

    async function updateLeaderboard() {
        console.log('leaderboards...')
        const leaderboardList = await locationApi.getLeaderboard(locationImage.id)
        setLeaderboardItems(leaderboardList.items)
    }

    function onAddressPicked(address: OsmAddress) {
        setMapCoords({
            lat: address.properties.lat,
            lng: address.properties.lon
        })
        setSelectedAddress(address)
        setInputEnabled(address !== null)
        console.log('address picked', address)
    }

    function populateWithGuessResult(guessResult: GuessResult) {
        console.log('guess results...')
        setInputEnabled(false)
        setErrorDistance(guessResult.errorInMeters)
        setMapCoords({
            lat: guessResult.lat,
            lng: guessResult.lng
        })
        setGuessCoords({
            lat: guessResult.lat,
            lng: guessResult.lng
        })
        setTargetCoords({
            lat: locationImage.lat,
            lng: locationImage.lng
        })
    }

    async function onGuessClicked() {
        try {
            console.log('guess clicked')
            if (selectedAddress) {
                console.log('guessing...')
                const guessResult = await locationApi.guessLocation(locationImage.id, selectedAddress.properties.formatted,
                    selectedAddress.properties.lat, selectedAddress.properties.lon)
                console.log(guessResult)

                if (guessResult.errorInMeters === 0) {
                    setInfoModalOpen(true)
                }

                setGuessResult(guessResult)
            }

        } catch (error) {
            console.error(error)
        }
    }

    const [infoModalOpen, setInfoModalOpen] = useState(false)

    return (
        <>
            <div className='container'>
                <div className="w3-row">
                    <div className="w3-col s12 m8">
                        <section className="section guess-location">
                            <h2 className="header4">Take a <span className="text-positive">guess</span> !</h2>
                            <div className="w3-margin-top">
                                <LocationImageComponent interactable={false} locationImage={locationImage} />
                            </div>
                            <MapComponent targetCoords={targetCoords} guessCords={guessCoords} coords={mapCoords} />
                            <div className="input-container">
                                <div className="search-street">
                                    {inputEnabled ? <SearchStreetComponent onAddressPicked={onAddressPicked} />
                                        : (
                                            <div className='location-address'>
                                                <label htmlFor='address' className="body">Location</label>
                                                <input className='input input-border' type='text' value={guessResult?.address} disabled={true} />
                                            </div>
                                        )}
                                </div>
                                <div className="error-distance w3-margin-top">
                                    <label className='body' htmlFor="errorDistance">Error distance</label>
                                    <div className='input input-border' id="errorDistance" >{errorDistance ? `${errorDistance} m` : ''}</div>
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
            <InfoModal isOpen={infoModalOpen} handleClose={() => setInfoModalOpen(false)} title='Congratulations !'
                message='You have guessed the location correctly' onFinished={(result) => setInfoModalOpen(false)} />

        </>
    )
}

export default GuessLocationPage