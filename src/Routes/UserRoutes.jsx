import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Signup from '../pages/User/Signup'
import Login from '../pages/User/Login'
import UserPublic from '../Protected/UserPublic'
import UserProtected from '../Protected/UserProtected'
import Banner from '../components/User/Banner'
import Layout from '../pages/User/Layout'
import Profile from '../components/User/Profile'
import Adventures from '../components/User/Adventures'
import SingleAdv from '../components/User/SingleAdv'
import Booking from '../components/User/Booking'
import Success from '../components/User/Success'
import BookingDetails from '../components/User/BookingDetails'
import ChatList from '../components/User/Chat/ChatList'
import WalletHistory from '../components/User/WalletHistory'

function UserRoutes() {
  return (
    
      <Routes>

          <Route element={<UserPublic/>}>
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/login' element={<Login/>}/>
          </Route>

          <Route element={<UserProtected/>}>
            <Route path='/' element={<Layout></Layout>}>
                <Route index element={<Banner/>}/>
                <Route path='/profile' element={<Profile/> } />
                <Route path='/adventures' element={<Adventures/>} />
                <Route path='/single' element={<SingleAdv/>}/>
                <Route path='/userBooking' element={<Booking/>}/>
                <Route path='/success' element={<Success/>}/>
                <Route path='/bookingDetails' element={<BookingDetails/>}/>
                <Route path='/chats' element={<ChatList/>}/>
                <Route path='/wallet' element={<WalletHistory/>}/>


            </Route>
          </Route>
        
        </Routes>
      
   
  )
}

export default UserRoutes
