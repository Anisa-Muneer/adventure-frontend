import React from 'react'
import {Routes,Route } from 'react-router-dom'
import Signup from '../pages/Adventure/Signup'
import Login from '../pages/Adventure/Login'
import AdventurePublic from '../Protected/AdventurePublic'
import AdventureProtected from '../Protected/AdventureProtected'
import Layout from '../pages/Adventure/Layout'
import AdvDash from '../components/Adventure/AdvDash'
import AdventureProfile from '../components/Adventure/Profile'
import Booking from '../components/Adventure/Booking'
import { Category } from '../components/Adventure/Category'
import UserBooking from '../components/Adventure/UserBooking'
import ChatList from '../components/Adventure/Chat/ChatList'
import Post from '../components/Adventure/Post'

function AdventureRoutes() {
  return (
   
      <Routes>
        <Route element={<AdventurePublic/>} >
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/login' element={<Login/>} />
        </Route>


        <Route element={<AdventureProtected/>} >
            <Route path='/' element={<Layout></Layout>} >
               <Route index element={<AdvDash />} />
               <Route path='/profile' element={<AdventureProfile/> } />
               <Route path='/slot' element={<Booking/> } />
               <Route path='/category' element={<Category/>}/>
               <Route path='/booking' element={<UserBooking/>}/>
               <Route path='/chats' element={<ChatList/>}/>
               <Route path='/posts' element={<Post/>}/>
            </Route>
        </Route>


      </Routes>
   
    

  )
}

export default AdventureRoutes
