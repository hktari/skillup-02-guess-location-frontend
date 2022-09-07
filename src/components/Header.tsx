import React from 'react'
import '../css/components/Header.css'
import logo from '../assets/images/logo.png'
import avatarPlaceholder from '../assets/images/avatar-placeholder.png'

type Props = {}

const Header = (props: Props) => {
  return (
    <>
      <header className='header w3-hide-medium w3-hide-large'>
        <img className='logo-top-left' src={logo} alt="geotagger logo" />
        <button className='menu-btn'>
          <span className="material-icons">
            menu
          </span>
        </button>
      </header>
      <nav className='side-nav'>
        <div className="nav-header">
          <button className="menu-btn">
            <div className="material-icons">close</div>
          </button>
        </div>
        <div className="nav-profile">
          <img className='profile-img' src={avatarPlaceholder} alt="user profile" />
          <span className='body user-name'>Jacob Jones</span>
        </div>
        <ul className='nav-items-list'>
          <li className="nav-item">
            <span className='body'>Home</span>
            <span className='material-icons'>chevron_right</span>
          </li>
          <li className="nav-item">
            <span className='body'>Profile Settings</span>
            <span className='material-icons'>chevron_right</span>
          </li>
          <li className="nav-item nav-item-positive">
            <span className='body'>Logout</span>
            <span className='material-icons'>chevron_right</span>
          </li>
        </ul>
        <div className="nav-buttons">
          <button className="btn btn-positive btn-block">SIGN UP</button>
          <button className="btn btn-outline btn-block">SIGN IN</button>
        </div>
      </nav>
      <header className='header'></header>
    </>
  )
}

export default Header