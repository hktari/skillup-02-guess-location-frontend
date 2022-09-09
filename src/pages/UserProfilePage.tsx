import React from 'react'
import { useLocation } from 'react-router-dom'
import ImageList, { LocationImageType } from '../components/Common/ImageList'
import { ItemList, LocationImage, User } from '../services/interface'
import locationApi from '../services/locationApi'
import { EmptyList } from '../util/LocationImageUtil'

const UserProfilePage = () => {


  const location = useLocation()
  const user = location.state as User

  async function loadBestGuesses(startIdx: number, pageSize: number): Promise<ItemList<LocationImage>> {
    try {
      return await locationApi.getBestGuesses(user.id, startIdx, pageSize)
    } catch (error) {
      console.error(error)
      return EmptyList()
    }
  }

  return (
    <div className='container'>
      <section className="section user-profile">
        <div className="user-profile-img">
          <img src={user.image} alt="profile" />
        </div>
        <section className="section best-guesses">
          <ImageList itemType={LocationImageType.GuessResult} pageSize={3} loadMoreItems={loadBestGuesses} />
        </section>
      </section>
    </div>
  )
}

export default UserProfilePage