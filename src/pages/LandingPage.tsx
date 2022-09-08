import React from 'react'
import worldMapImg from '../assets/images/background-world-map.png'
import '../css/pages/LandingPage.css'
import locationImgSample1 from '../assets/images/location-img-sample01.png'
import locationImgSample2 from '../assets/images/location-img-sample02.png'
import locationImgSample3 from '../assets/images/location-img-sample03.png'
import LocationImageLocked from '../components/Landing/LocationImageLocked'

type Props = {}

const LandingPage = (props: Props) => {
  return (
    <div className="container content-container landing-page-container">
      <section className="section explore">
        <div className="w3-row">
          <div className="w3-third">
            <h2 className='header4 text-positive'>Explore the world with Geotagger !</h2>
            <p className="body">Geotagger is website that allows you to post picture and tag it on the map. Other user than try to locate it via Google Maps. </p>
            <button className="btn btn-positive">SIGN IN</button>
          </div>
          <div className="w3-twothird">
            <img className='world-map' src={worldMapImg} alt="world map" />
          </div>
        </div>
      </section>

      <section className="section tryit">
        <h3 className="header5 text-positive">Try yourself at Geotagger !</h3>
        <p className="body text-center">Try to guess the location of image by selecting position on the map. When you guess it, it gives you the error distance.</p>

        <div className="w3-row img-list-container">
          <div className="w3-mobile w3-third img-item">
            <LocationImageLocked img={locationImgSample1} title="san francisco" />
          </div>
          <div className="w3-mobile w3-third img-item">
            <LocationImageLocked img={locationImgSample2} title="stone henge" />
          </div>
          <div className="w3-mobile w3-third img-item">
            <LocationImageLocked img={locationImgSample3} title="Venice" />
          </div>
        </div>
        <button className="btn btn-positive">SIGN UP</button>
      </section>

    </div>
  )
}

export default LandingPage