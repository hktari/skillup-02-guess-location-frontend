import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import Modals from './Modals'

const Layout = () => {
  return (
    <>
      <div className="page-wrap">
        <Header />
        <main>
          <Outlet />
          <Modals />
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
