import { Outlet } from 'react-router-dom'
import React from 'react'


import AdventureNavbar from '../../components/common/Adventure/NavBar'
import { AdventureSidebar } from '../../components/common/Adventure/Sidebar'


function Layout() {
  return (
    <div className='h-screen flex flex-col'>
      <AdventureNavbar />
      <div className='flex flex-grow md:flex-row'>
        <div className='hidden md:flex'>
          <AdventureSidebar />
        </div>
        <div className='flex-grow'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
