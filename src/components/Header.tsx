import React, { useState } from 'react'
import '../css/components/Header.css'
import logo from '../assets/images/logo.png'
import avatarPlaceholder from '../assets/images/avatar-placeholder.png'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthProvider'

type Props = {}

enum HeaderNavItemsType {
  NoItems,
  NewUser,
  LoggedIn
}

const Header = (props: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  function toggleSidebar() {
    console.log('toggle sidebar')
    setSidebarOpen(!sidebarOpen)
  }

  function isLoggedIn() {
    return false
  }

  function getNavItemsType(pagePath: string) {
    let val: HeaderNavItemsType = HeaderNavItemsType.NewUser
    if (isLoggedIn()) {
      val = HeaderNavItemsType.LoggedIn
    }
    else if (pagePath.includes('login')) {
      val = HeaderNavItemsType.NoItems
    } else if (pagePath.includes('signup')) {
      val = HeaderNavItemsType.NoItems
    }

    return val
  }

  function logout() {

  }
  function profileSettings() {

  }

  const navItemsType = getNavItemsType(location.pathname)

  function navigateToUserProfile() {
    navigate('user-profile', {
      state: user
    })
  }

  return (
    <>
      <header className='header '>
        <img className='logo-top-left' src={logo} alt="geotagger logo" />
        <div className="w3-hide-medium w3-hide-large">
          <button className='menu-btn' onClick={toggleSidebar}>
            <span className="material-icons">
              menu
            </span>
          </button>
        </div>
        <div className="w3-hide-small">

          {/* <nav className="nav-items-desktop new-user"
            hidden={navItemsType !== HeaderNavItemsType.NewUser}>
            <ul className="nav-item-list">
              <li className="nav-item">
                <Link to='login' className="body text-small link">Sign in</Link>
                <span>or</span>
              </li>
              <li className="nav-item">
                <Link to='signup' className="btn text-small btn-positive">SIGN UP</Link>
              </li>
            </ul>
          </nav> */}
          {/* hidden={navItemsType !== HeaderNavItemsType.LoggedIn} */}
          <nav className="nav-items-desktop logged-in" >
            <ul className='nav-item-list'>
              <li className="nav-item">
                <Link className='link' to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <button className='link' onClick={profileSettings}>Profile Settings</button>
              </li>
              <li className="nav-item">
                <button className='link' onClick={logout}>Logout</button>
              </li>
            </ul>
            <div className="nav-buttons">
              <button className='btn btn-circle btn-gray'>
                <img src={user?.image ?? avatarPlaceholder} alt="user profile" className="profile-img" />
              </button>
              <button className="btn btn-circle btn-positive">
                <span className="material-icons">add</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <nav className={'side-nav w3-animate-left w3-animate-opacity'} hidden={!sidebarOpen}>
        <div className="nav-header">
          <button className="menu-btn" onClick={toggleSidebar}>
            <div className="material-icons">close</div>
          </button>
        </div>
        <div className="nav-profile" onClick={navigateToUserProfile}>
          <img className='profile-img' src={user?.image ?? avatarPlaceholder} alt="user profile" />
          <span className='body user-name'>{user?.firstName} {user?.lastName}</span>
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
    </>
  )
}

export default Header