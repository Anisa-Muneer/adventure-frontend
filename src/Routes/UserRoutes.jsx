import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Signup from '../pages/User/Signup'
import Login from '../pages/User/Login'

import UserPublic from '../Protected/UserPublic'
import UserProtected from '../Protected/UserProtected'
import Home from '../pages/User/Home'

function UserRoutes() {
  return (
    
        <Routes>
          <Route element={<UserPublic/>}>
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/login' element={<Login/>}/>
            </Route>

            <Route element={<UserProtected/>}>
              <Route path='/' element={<Home/>}/>
            </Route>
        </Routes>
      
   
  )
}

export default UserRoutes
