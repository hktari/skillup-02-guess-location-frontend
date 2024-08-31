import React from 'react'
import worldMapImg from '../assets/images/background-world-map.png'
import locationImgSample1 from '../assets/images/location-img-sample01.png'
import locationImgSample2 from '../assets/images/location-img-sample02.png'
import locationImgSample3 from '../assets/images/location-img-sample03.png'
import LocationImageLocked from '../components/Landing/LocationImageLocked'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../components/PrimaryButton'

type Props = {}

const LandingPage = (props: Props) => {
  const navigate = useNavigate()

  return (
    <div className="space-y-16 py-12 md:space-y-48">
      <section>
        <div className="relative space-y-12 px-6 py-8">
          <div className="space-y-5 text-center md:w-96 md:text-start">
            <h2 className="text-4xl font-bold text-patina-400 md:text-start">
              Explore the world with Geotagger !
            </h2>
            <p className="text-lg md:text-start">
              Geotagger is website that allows you to post picture and tag it on
              the map. Other user than try to locate it via Google Maps.{' '}
            </p>
            <div className="md:text-start">
              <PrimaryButton onClick={() => navigate('/login')}>
                SIGN IN
              </PrimaryButton>
            </div>
          </div>
          <img
            className="inset-y-0 right-0 -z-10 md:absolute md:w-3/4"
            src={worldMapImg}
            alt="world map"
          />
        </div>
      </section>

      <section className="space-y-4 px-8 text-center">
        <h3 className="mx-auto w-3/4 text-3xl text-patina-500 md:text-3xl">
          Try yourself at Geotagger !
        </h3>
        <p className="text-l">
          Try to guess the location of image by selecting position on the map.
          When you guess it, it gives you the error distance.
        </p>

        <div className="space-y-5 md:columns-3 md:pt-12">
          <LocationImageLocked img={locationImgSample1} title="san francisco" />
          <LocationImageLocked img={locationImgSample2} title="stone henge" />
          <LocationImageLocked img={locationImgSample3} title="Venice" />
        </div>
        <PrimaryButton onClick={() => navigate('/signup')}>
          SIGN UP
        </PrimaryButton>
      </section>
    </div>
  )
}
export default LandingPage
