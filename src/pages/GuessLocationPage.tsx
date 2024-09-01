import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MapComponent, { Coordinates } from '../components/Common/MapComponent'
import SearchStreetComponent from '../components/Common/SearchStreetComponent'
import LocationImageComponent from '../components/Dashboard/LocationImageComponent'
import LeaderboardComponent from '../components/GuessLocation/LeaderboardComponent'
import InfoModal from '../components/modals/InfoModal'
import {
  GuessResult,
  LeaderboardItem,
  LocationImage,
} from '../services/interface'
import locationApi from '../services/locationApi'
import { OsmAddress } from '../services/osm.interface'
import Container from '../components/Common/Container'
import PrimaryButton from '../components/PrimaryButton'

const GuessLocationPage = () => {
  const [selectedAddress, setSelectedAddress] = useState<OsmAddress | null>(
    null,
  )
  const [errorDistance, setErrorDistance] = useState<number | null>(null)
  const [inputEnabled, setInputEnabled] = useState(true)
  const [leaderboardItems, setLeaderboardItems] = useState<LeaderboardItem[]>(
    [],
  )
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
      lng: address.properties.lon,
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
      lng: guessResult.lng,
    })
    setGuessCoords({
      lat: guessResult.lat,
      lng: guessResult.lng,
    })
    setTargetCoords({
      lat: locationImage.lat,
      lng: locationImage.lng,
    })
  }

  async function onGuessClicked() {
    try {
      console.log('guess clicked')
      if (selectedAddress) {
        console.log('guessing...')
        const guessResult = await locationApi.guessLocation(
          locationImage.id,
          selectedAddress.properties.formatted,
          selectedAddress.properties.lat,
          selectedAddress.properties.lon,
        )
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
      <Container className="grid-cols-2 gap-10 space-y-8 md:space-y-0 md:grid">
        <section className="space-y-4">
          <h2 className="text-4xl">
            Take a <span className="text-patina-400">guess</span> !
          </h2>
          <div className="w-100">
            <LocationImageComponent
              fullContainerWidth
              interactable={false}
              locationImage={locationImage}
            />
          </div>
          <MapComponent
            targetCoords={targetCoords}
            guessCords={guessCoords}
            coords={mapCoords}
          />
          <div className="space-y-4">
            <div>
              {inputEnabled ? (
                <SearchStreetComponent onAddressPicked={onAddressPicked} />
              ) : (
                <div>
                  <label htmlFor="address">Location</label>
                  <input
                    type="text"
                    value={guessResult?.address}
                    disabled={true}
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-2xl" htmlFor="errorDistance">
                Error distance
              </label>
              <input
                value={errorDistance ? `${errorDistance} m` : ''}
                type="text"
                disabled
                className="h-10 w-full rounded-md bg-white ring-1 ring-gray-300 px-2"
                id="errorDistance"
              ></input>
            </div>

            <div className="pt-2 text-end">
              <PrimaryButton
                className="ms-auto inline-block bg-red-300"
                disabled={!inputEnabled}
                onClick={onGuessClicked}
              >
                GUESS
              </PrimaryButton>
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-4xl">Leaderboard</h2>
          <div>
            <LeaderboardComponent leaderboardItems={leaderboardItems} />
          </div>
        </section>
      </Container>
      <InfoModal
        isOpen={infoModalOpen}
        handleClose={() => setInfoModalOpen(false)}
        title="Congratulations !"
        message="You have guessed the location correctly"
        onFinished={(result) => setInfoModalOpen(false)}
      />
    </>
  )
}

export default GuessLocationPage
