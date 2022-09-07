import React from 'react'
import '../css/components/Header.css'
import logo from '../assets/images/logo.png'

type Props = {}

const Header = (props: Props) => {
  return (
    <header className='header'>
      <img className='logo-top-left' src={logo} alt="geotagger logo" />
      <button className='menu-btn'>
        <span className="material-icons">
          menu
        </span>
      </button>
    </header>
  )
}

export default Header