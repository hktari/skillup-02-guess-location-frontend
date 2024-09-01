import { useLocation } from 'react-router-dom'
import ImageList, { LocationImageType } from '../components/Common/ImageList'
import { ItemList, LocationImage, User } from '../services/interface'
import locationApi from '../services/locationApi'
import { EmptyList } from '../util/LocationImageUtil'
import { useAuth } from '../components/context/AuthProvider'

import AvatarPlaceholder from '../assets/images/avatar-placeholder.png'
import Container from '../components/Common/Container'
import Avatar from '../components/Common/Avatar'

const UserProfilePage = () => {
  const location = useLocation()
  const user = location.state as User
  const authContext = useAuth()

  async function loadBestGuesses(
    startIdx: number,
    pageSize: number,
  ): Promise<ItemList<LocationImage>> {
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
      <Container className="">
        <div className="flex items-center justify-start gap-5">
          <div className="inline-block h-16 w-16">
            <Avatar
              imageUrl={
                'https://plus.unsplash.com/premium_photo-1674854858248-8987c02e74cf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
            />
          </div>
          <span className="text-xl">
            {user.firstName} {user.lastName}
          </span>
        </div>

        <section className="space-y-8 py-px">
          <h2 className="text-start text-3xl text-patina-400">
            {isLoggedInUser() ? 'My best guesses' : 'Best guesses'}{' '}
          </h2>
          <ImageList
            itemType={LocationImageType.GuessResult}
            pageSize={4}
            colsPerRow={4}
            loadMoreItems={loadBestGuesses}
          />
        </section>

        <section className="space-y-8">
          <h2 className="text-start text-3xl text-patina-400">
            {isLoggedInUser() ? 'My uploads' : 'Uploads'}
          </h2>
          <ImageList
            itemType={
              isLoggedInUser()
                ? LocationImageType.EditableLocationImage
                : LocationImageType.LocationImage
            }
            pageSize={4}
            colsPerRow={4}
            loadMoreItems={loadUploads}
          />
        </section>
      </Container>
    </>
  )
}

export default UserProfilePage
