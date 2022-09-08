import React, { useState, useEffect } from 'react'
import HorizontalImageList from '../components/Dashboard/HorizontalImageList'
import '../css/pages/DashboardPage.css'
import { LocationImage } from '../services/interface'
import locationApi from '../services/locationApi'

type Props = {}

const DashboardPage = (props: Props) => {

  const [newUploads, setNewUploads] = useState<LocationImage[]>([])

  useEffect(() => {

    async function getLocations() {
      setNewUploads(await locationApi.getAll())
    }

    getLocations()
  }, [])


  return (
    <div className="container dashboard-page-container">
      <section className="personal">
        <h2 className='header4 text-positive'>Personal best guesses</h2>
        <p className="body">Your personal best guesses appear here. Go on and try to beat your personal records or set a new one!</p>
        <HorizontalImageList images={newUploads} />
      </section>

      <section className="new-uploads">
        <h2 className="header4 text-positive">
          New uploads
        </h2>
        <p className="body">
          New uploads from users. Try to guess all the locations by pressing on a picture.
        </p>


      </section>

    </div>
  )
}

export default DashboardPage