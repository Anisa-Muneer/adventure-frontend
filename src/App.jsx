import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UserRoutes from './Routes/UserRoutes'
import AdventureRoutes from './Routes/AdventureRoutes'
import AdminRoutes from './Routes/AdminRoutes'

function App() {
  return (
  
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/*' element = {<UserRoutes/>} />
            <Route path='/adventure/*' element = {<AdventureRoutes/> }/>
            <Route path='/admin/*' element={ <AdminRoutes/> }/>
          </Routes>

      </BrowserRouter>
      
    </div>
  
  )
}

export default App
