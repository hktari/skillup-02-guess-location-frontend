import React, { useState, useEffect } from 'react'
import ImageList, { LocationImageType } from '../components/Common/ImageList'
import { useAuth } from '../components/context/AuthProvider'
import HorizontalImageList from '../components/Dashboard/HorizontalImageList'
import '../css/pages/DashboardPage.css'
import { ItemList, LocationImage } from '../services/interface'
import locationApi from '../services/locationApi'
import { EmptyList } from '../util/LocationImageUtil'

type Props = {}

const DashboardPage = (props: Props) => {

  const [locationGuessList, setLocationGuessList] = useState<LocationImage[]>([])

  useEffect(() => {
    async function loadData() {
      const locationGuessList = await getLocationGuesses(0, 10)
      setLocationGuessList(locationGuessList.items)
    }

    loadData()
  }, [])

  async function getLocationGuesses(startIdx: number, pageSize: number): Promise<ItemList<LocationImage>> {
    try {
      // todo: user id
      return await locationApi.getBestGuesses(0, startIdx, pageSize)
    } catch (error) {
      console.error(error)
      window.alert('Failed to fetch quotes...')
      return EmptyList()
    }
  }

  async function getNewUploads(startIdx: number, pageSize: number): Promise<ItemList<LocationImage>> {
    try {
      return await locationApi.getNewUploads(startIdx, pageSize)
    } catch (error) {
      console.error(error)
      window.alert('Failed to fetch quotes...')
      return EmptyList()
    }
  }

  // const { login } = useAuth()
  // // todo: remove after testing
  // useEffect(() => {
  //   async function doLogin() {
  //     await login('', '')
  //   }
  //   doLogin()
  // }, [])



  return (
    <div className="container dashboard-page-container">
      <section className="section personal">
        <h2 className='header4 text-positive'>Personal best guesses</h2>
        <p className="body">Your personal best guesses appear here. Go on and try to beat your personal records or set a new one!</p>
        <div className="w3-hide-medium w3-hide-large">
          <HorizontalImageList images={locationGuessList} />
        </div>
        <div className="w3-hide-small">
          <ImageList itemType={LocationImageType.GuessResult} needsUpdate={0} pageSize={3} loadMoreItems={getLocationGuesses} />
        </div>
      </section>

      <section className="section new-uploads">
        <h2 className="header4 text-positive">
          New uploads
        </h2>
        <p className="body">
          New uploads from users. Try to guess all the locations by pressing on a picture.
        </p>
        <ImageList itemType={LocationImageType.LocationImage} needsUpdate={0} pageSize={4}
          loadMoreItems={getNewUploads} />

      </section>

    </div>
  )
}

export default DashboardPage