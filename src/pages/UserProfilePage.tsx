import { useLocation } from 'react-router-dom'
import ImageList, { LocationImageType } from '../components/Common/ImageList'
import { ItemList, LocationImage, User } from '../services/interface'
import locationApi from '../services/locationApi'
import { EmptyList } from '../util/LocationImageUtil'
import '../css/pages/UserProfilePage.css'
import { useAuth } from '../components/context/AuthProvider'

import AvatarPlaceholder from '../assets/images/avatar-placeholder.png'

const UserProfilePage = () => {
  const location = useLocation()
  const user = location.state as User
  const authContext = useAuth()

  async function loadBestGuesses(startIdx: number, pageSize: number): Promise<ItemList<LocationImage>> {
    try {
      if (!user) {
        throw new Error('no user')
      }

      return await locationApi.getGuessesByUser(user.id, startIdx, pageSize)
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
    <>
      <div className='container'>
        <section className="section user-profile w3-row">
          <div className="user-profile-img w3-left">
            <img src={user.imageUrl ?? AvatarPlaceholder} alt="profile" />
          </div>
          <p className="user-name header5 w3-left">{user.firstName} {user.lastName}</p>
        </section>

        <section className="section best-guesses">
          <h2 className='header5 text-positive w3-left'>{isLoggedInUser() ? 'My best guesses' : 'Best guesses'} </h2>
          <ImageList itemType={LocationImageType.GuessResult}
            pageSize={4}
            colsPerRow={4}
            loadMoreItems={loadBestGuesses} />
        </section>

        <section className="section uploads">
          <h2 className="header5 text-positive w3-left">{isLoggedInUser() ? 'My uploads' : 'Uploads'}</h2>
          <ImageList itemType={isLoggedInUser() ? LocationImageType.EditableLocationImage : LocationImageType.LocationImage}
            pageSize={4}
            colsPerRow={4}
            loadMoreItems={loadUploads} />
        </section>
      </div>
    </>
  )
}

export default UserProfilePage