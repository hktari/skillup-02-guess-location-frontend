import React from 'react'
import { useLocation } from 'react-router-dom'
import ImageList, { LocationImageType } from '../components/Common/ImageList'
import { ItemList, LocationImage, User } from '../services/interface'
import locationApi from '../services/locationApi'
import { EmptyList } from '../util/LocationImageUtil'
import '../css/pages/UserProfilePage.css'
import { useAuth } from '../components/context/AuthProvider'

const UserProfilePage = () => {
  const location = useLocation()
  const user = location.state as User
  const authContext = useAuth()

  console.log('user-profile page', user)

  async function loadBestGuesses(startIdx: number, pageSize: number): Promise<ItemList<LocationImage>> {
    try {
      return await locationApi.getBestGuesses(user.id, startIdx, pageSize)
    } catch (error) {
      console.error(error)
      return EmptyList()
    }
  }

  async function loadUploads(startIdx: number, pageSize: number) {
    try {
      return await locationApi.getUploads(user.id, startIdx, pageSize)
    } catch (error) {
      console.error(error)
      return EmptyList()
    }
  }

  function isLoggedInUser() {
    return authContext.user?.id === user.id
  }

  return (
    <div className='container'>
      <section className="section user-profile">
        <div className="user-profile-img w3-left">
          <img src={user.image} alt="profile" />
        </div>
        <p className="user-name header5 w3-left">{user.firstName} {user.lastName}</p>
      </section>

      <section className="section best-guesses w3-row">
        <h2 className='header5 text-positive'>{isLoggedInUser() ? 'My best guesses' : 'Best guesses'} </h2>
        <ImageList itemType={LocationImageType.GuessResult} pageSize={3} loadMoreItems={loadBestGuesses} />
      </section>

      <section className="section uploads">
        <h2 className="header5 test-positive">{isLoggedInUser() ? 'My uploads' : 'Uploads'}</h2>
        <ImageList itemType={isLoggedInUser() ? LocationImageType.EditableLocationImage : LocationImageType.LocationImage}
          pageSize={4} loadMoreItems={loadUploads} />
      </section>
    </div>
  )
}

export default UserProfilePage