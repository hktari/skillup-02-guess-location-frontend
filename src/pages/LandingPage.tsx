import React from 'react'
import worldMapImg from '../assets/images/background-world-map.png'
import '../css/pages/LandingPage.css'
import locationImgSample1 from '../assets/images/location-img-sample01.png'
import locationImgSample2 from '../assets/images/location-img-sample02.png'
import locationImgSample3 from '../assets/images/location-img-sample03.png'
import LocationImageLocked from '../components/Landing/LocationImageLocked'
import { useNavigate } from 'react-router-dom'

type Props = {}

const LandingPage = (props: Props) => {
  const navigate = useNavigate()

  return (
    <div>
      <section>
        <div className="relative space-y-6 px-6 py-16">
          <div className="space-y-5 text-center md:w-96 md:text-start">
            <h2 className="text-patina-400 font-bold text-4xl md:text-start">
              Explore the world with Geotagger !
            </h2>
            <p className="md:text-start text-lg">
              Geotagger is website that allows you to post picture and tag it on
              the map. Other user than try to locate it via Google Maps.{' '}
            </p>
            <div className="md:text-start">
              <button
                className="bg-patina-400 h-12 w-32 rounded text-white"
                onClick={() => navigate('/login')}
              >
                SIGN IN
              </button>
            </div>
          </div>
          <img
            className="inset-y-0 right-0 -z-10 md:absolute md:w-3/4"
            src={worldMapImg}
            alt="world map"
          />
        </div>
      </section>

      <section>
        <h3>Try yourself at Geotagger !</h3>
        <p>
          Try to guess the location of image by selecting position on the map.
          When you guess it, it gives you the error distance.
        </p>

        <div>
          <div>
            <LocationImageLocked
              img={locationImgSample1}
              title="san francisco"
            />
          </div>
          <div>
            <LocationImageLocked img={locationImgSample2} title="stone henge" />
          </div>
          <div>
            <LocationImageLocked img={locationImgSample3} title="Venice" />
          </div>
        </div>
        <button onClick={() => navigate('/signup')}>SIGN UP</button>
      </section>
    </div>
  )
}
export default LandingPage
