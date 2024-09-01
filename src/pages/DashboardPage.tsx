import { useState, useEffect } from 'react'
import ImageList, { LocationImageType } from '../components/Common/ImageList'
import { useAuth } from '../components/context/AuthProvider'
import HorizontalScrollingList from '../components/Dashboard/HorizontalScrollingList'
import { ItemList, LocationImage } from '../services/interface'
import locationApi from '../services/locationApi'
import { EmptyList } from '../util/LocationImageUtil'
import LocationImageGuess from '../components/Dashboard/LocationImageGuess'

type Props = {}

const DashboardPage = (props: Props) => {
  const [locationGuessList, setLocationGuessList] = useState<LocationImage[]>(
    [],
  )

  const { user } = useAuth()

  useEffect(() => {
    async function loadData() {
      const locationGuessList = await getLocationGuesses(0, 10)
      setLocationGuessList(locationGuessList.items)
    }

    loadData()
  }, [])

  async function getLocationGuesses(
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
      window.alert('Failed to fetch quotes...')
      return EmptyList()
    }
  }

  async function getNewUploads(
    startIdx: number,
    pageSize: number,
  ): Promise<ItemList<LocationImage>> {
    try {
      return await locationApi.getNewUploads(startIdx, pageSize)
    } catch (error) {
      console.error(error)
      window.alert('Failed to fetch quotes...')
      return EmptyList()
    }
  }

  return (
    <div className="container space-y-12 px-8 py-12">
      <section className="space-y-2">
        <h2 className="text-3xl text-patina-400">
          Personal best <br className="md:hidden" /> guesses
        </h2>
        <p className="">
          Your personal best guesses appear here. Go on and try to beat your
          personal records or set a new one!
        </p>
        <div className="md:hidden">
          <HorizontalScrollingList
            items={locationGuessList}
            ItemComponent={LocationImageGuess}
          ></HorizontalScrollingList>
        </div>
        <div className="hidden pt-12 md:block">
          <ImageList
            itemType={LocationImageType.GuessResult}
            needsUpdate={0}
            pageSize={3}
            loadMoreItems={getLocationGuesses}
          />
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-3xl text-patina-400">New uploads</h2>
        <p className="">
          New uploads from users. Try to guess all the locations by pressing on
          a picture.
        </p>
        <div className="pt-6">
          <ImageList
            itemType={LocationImageType.LocationImage}
            needsUpdate={0}
            pageSize={4}
            loadMoreItems={getNewUploads}
          />
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
