import { Outlet } from 'react-router-dom'
import React from 'react'
import { NavbarDark } from '../../components/common/admin/NavBar'
import { AdminSidebar } from '../../components/common/admin/Sidebar'

function Layout() {
  return (
    <div className='h-screen flex flex-col'>
      <NavbarDark />
      <div className='flex flex-grow md:flex-row'>
        <div className='hidden md:flex'>
          <AdminSidebar />
        </div>
        <div className='flex-grow'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
