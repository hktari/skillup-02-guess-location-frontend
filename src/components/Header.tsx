import React from 'react'
import '../css/components/Header.css'
import logo from '../assets/images/logo.png'

type Props = {}

const Header = (props: Props) => {
  return (
    <div>
      <img className='logo-top-left ' src={logo} alt="geotagger logo" />
    </div>
  )
}

export default Header