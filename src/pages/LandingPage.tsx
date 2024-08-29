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
        <div>
          <div>
            <h2 className="text-3xl font-bold underline">
              Explore the world with Geotagger !
            </h2>
            <p>
              Geotagger is website that allows you to post picture and tag it on
              the map. Other user than try to locate it via Google Maps.{' '}
            </p>
            <button onClick={() => navigate('/login')}>SIGN IN</button>
          </div>
          <div>
            <img src={worldMapImg} alt="world map" />
          </div>
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
