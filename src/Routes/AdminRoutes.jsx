import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminPublic from '../Protected/AdminPublic'
import Login from '../pages/Admin/login'
import AdminProtected from '../Protected/AdminProtected'
import Layout from '../pages/Admin/Layout'
import Dashboard from '../components/Admin/Dashboard'
import { Adventures } from '../components/Admin/Adventures'
import { Users } from '../components/Admin/Users'
import Notification from '../components/Admin/Notification'
import Verification from '../components/Admin/Verification'
import {Booking} from '../components/Admin/Booking'




export default function AdminRoutes() {
  return (
    <Routes>
        <Route element={ <AdminPublic/> }>
            <Route exact path='/login' element={ <Login/> }/>

        </Route>

        <Route element={ <AdminProtected/> } >
            <Route path='/' element={<Layout></Layout> } >
              <Route index element={<Dashboard/>} />
              <Route path='/adventures' element={<Adventures/> }/>
              <Route path='/users' element={<Users/>} />
              <Route path='/notification' element={ <Notification/> }/>
              <Route path='/verification' element={ <Verification/> }/>
              <Route path='/booking' element={ <Booking/> }/>
           
             

            </Route> 

        </Route>
    </Routes>
  )
}
